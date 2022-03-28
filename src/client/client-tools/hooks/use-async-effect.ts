import React from 'react';
import { runAsyncAction } from '../../../common/interfaces/common';
import { useAsyncError } from './use-async-error';

export const useAsyncEffect = (
    action: (abortSignal: AbortSignal) => Promise<void>,
    deps?: React.DependencyList,
): void => {
    React.useEffect(() => {
        const abortController = new AbortController();
        runAsyncAction(() => action(abortController.signal));
        return () => {
            abortController.abort();
        };
    }, deps);
};


export const useAsyncEffectWithError = (
    action: (abortSignal: AbortSignal) => Promise<void>,
    deps?: React.DependencyList,
): void => {
    const throwError = useAsyncError();
    const actionWrapper = async (abortSignal: AbortSignal) => {
        try {
            await action(abortSignal);
        } catch (e) {
            if (e.name !== `AbortError`) {
                throwError(e);
            }
        }
    };
    useAsyncEffect(actionWrapper, deps);
};