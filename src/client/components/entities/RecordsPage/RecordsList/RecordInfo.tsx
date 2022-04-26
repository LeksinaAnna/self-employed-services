import React from 'react';
import {
    CachedOutlined,
    CalendarMonthOutlined,
    CancelOutlined,
    PersonOutline,
    TaskAltOutlined,
} from '@mui/icons-material';
import { Gapped, Hint } from '@skbkontur/react-ui';
import moment from 'moment';
import styled from '@emotion/styled';
import {
    darkBackground,
    greenText,
    notActiveText,
    orangeText,
    redText,
    secondaryText,
} from '../../../../client-tools/styles/color';
import { Typography } from '../../../ui/Text/Typography';
import { LargeRecord } from '../../../../../server/modules/domains/records/entities/record.entity';

interface Props {
    record: LargeRecord;
}

const TimeWrapper = styled.div`
    width: 150px;
    display: flex;
    justify-items: center;
    padding: 5px 15px;
    border: 1px solid ${darkBackground};
`;

export const RecordInfo: React.FC<Props> = ({ record }) => (
    <div>
        <Gapped gap={2} vertical>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <PersonOutline sx={{ color: notActiveText }} fontSize={'large'} />
                <div>
                    <Typography color={secondaryText} fontSize="18px">
                        {record?.client?.name}
                    </Typography>
                    <Typography color={orangeText} fontSize="12px">
                        {record?.service?.title}
                    </Typography>
                </div>
            </div>
            <TimeWrapper>
                <Gapped gap={3} verticalAlign="middle">
                    <CalendarMonthOutlined sx={{ color: secondaryText }} fontSize="small" />
                    <Typography color={secondaryText}>{moment(record.recordDate).format('DD/MM/YY')}</Typography>
                </Gapped>
                <Gapped gap={3} verticalAlign="middle" style={{ marginLeft: 10 }}>
                    <StatusIcon record={record} />
                    <Typography color={secondaryText}>{moment(record.recordDate).format('HH:mm')}</Typography>
                </Gapped>
            </TimeWrapper>
        </Gapped>
    </div>
);

const StatusIcon: React.FC<Props> = ({ record }) => {
    switch (record?.status) {
        case 'sent':
            return (
                <Hint text={'Ожидает обработки'}>
                    <div style={{ paddingTop: '3px' }}>
                        <CachedOutlined sx={{ color: orangeText }} fontSize="small" />
                    </div>
                </Hint>
            );
        case 'canceled':
            return (
                <Hint text={'Отменена'}>
                    <div style={{ paddingTop: '3px' }}>
                        <CancelOutlined sx={{ color: redText }} fontSize="small" />
                    </div>
                </Hint>
            );

        case 'accepted':
            return (
                <Hint text={'Принята'}>
                    <div style={{ paddingTop: '3px' }}>
                        <TaskAltOutlined sx={{ color: greenText }} fontSize="small" />
                    </div>
                </Hint>
            );
        default:
            return <></>;
    }
};
