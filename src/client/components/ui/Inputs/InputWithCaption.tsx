import React from 'react';
import { Nullable } from '@skbkontur/react-ui-validations/typings/Types';
import { ValidationInfo } from '@skbkontur/react-ui-validations/src/ValidationWrapper';
import { ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Gapped, Input, InputType } from '@skbkontur/react-ui';
import { Typography } from '../Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';

interface Props {
    value: string;
    caption?: string;
    onValueChange: (value: string) => void;
    gap?: number;
    vertical?: boolean;
    type?: InputType;
    validator?: (value: string) => Nullable<ValidationInfo>;
}

export const InputWithCaption: React.FC<Props> = ({
    caption,
    onValueChange,
    value,
    gap = 5,
    vertical = false,
    type = 'text',
    validator= null
}) => (
    <Gapped gap={gap} vertical={vertical}>
        <Typography color={secondaryText}>{caption}</Typography>
        {!validator && <Input type={type} value={value} onValueChange={onValueChange} />}
        {validator && (
            <ValidationWrapper validationInfo={validator(value)}>
                <Input type={type} value={value} onValueChange={onValueChange} />
            </ValidationWrapper>
        )}
    </Gapped>
);
