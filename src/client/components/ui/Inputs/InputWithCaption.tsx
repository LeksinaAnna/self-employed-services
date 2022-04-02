import React from 'react';
import { Gapped, Input, InputType } from '@skbkontur/react-ui';
import { Typography } from '../Text/Typography';
import { disabledText } from '../../../client-tools/styles/color';

interface Props {
    value: string;
    caption?: string;
    onValueChange: (value: string) => void;
    gap?: number;
    vertical?: boolean;
    type?: InputType;
}

export const InputWithCaption: React.FC<Props> = ({
    caption,
    onValueChange,
    value,
    gap = 5,
    vertical = false,
    type = 'text',
}) => (
    <Gapped gap={gap} vertical={vertical}>
        <Typography color={disabledText}>{caption}</Typography>
        <Input type={type} value={value} onValueChange={onValueChange} />
    </Gapped>
);
