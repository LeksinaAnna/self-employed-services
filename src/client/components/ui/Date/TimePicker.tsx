import React, { CSSProperties, useEffect } from 'react';
import { Input } from '@skbkontur/react-ui';

interface Props {
    width?: number | string;
    value?: string;
    onValueChange?: (value: string) => void;
    minTime?: string;
    maxTime?: string;
    styles?: CSSProperties;
}

export const TimePicker: React.FC<Props> = ({
    width,
    styles,
    value = '00:00',
    onValueChange = () => {},
    minTime = '00:00',
    maxTime = '23:00',
}) => {
    const [_value, setValue] = React.useState<string>(value);

    useEffect(() => {
        let [hours, minutes] = _value.split(':');
        const [minHours] = minTime.split(':');
        const [maxHours] = maxTime.split(':');

        if (Number(hours) > Number(maxHours)) {
            hours = maxHours;
        }

        if (Number(hours) < Number(minHours)) {
            hours = minHours;
        }

        if (Number(minutes) > 59) {
            minutes = '59';
        }

        const result = [hours, minutes].join(':')
        setValue(result);
        onValueChange(result);
    }, [_value]);

    return <Input style={styles} width={width} mask={'99:99'} value={_value} onValueChange={setValue} />;
};
