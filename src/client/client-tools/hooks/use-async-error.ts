import * as React from 'react';

export const useAsyncError = () => {
    const [, setError] = React.useState();
    return React.useCallback(
        e => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
};