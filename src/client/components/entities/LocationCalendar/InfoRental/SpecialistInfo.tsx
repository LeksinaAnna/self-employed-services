import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '../../../ui/Text/Typography';
import { UserProfile } from '../../../../../server/modules/domains/users/entities/user-profile.entity';

interface Props {
    userInfo: UserProfile;
}

const SpecialistInfoWrapper = styled.div`
    padding: 5px;
    margin-top: 5px;
`;

const InfoItem = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;

    div:last-child {
        margin-left: 10px;
    }
`;

export const SpecialistInfo: React.FC<Props> = ({ userInfo }) => (
    <SpecialistInfoWrapper>
        <InfoItem>
            <Typography fontSize={'14px'} color={'#fff'}>
                Арендатор:
            </Typography>
            <Typography color={'#fff'}>{userInfo.fullName}</Typography>
        </InfoItem>
        <InfoItem>
            <Typography fontSize={'14px'} color={'#fff'}>
                Телефон:
            </Typography>
            <Typography color={'#fff'}>{userInfo.contacts.phone || ' - '}</Typography>
        </InfoItem>
        <InfoItem>
            <Typography fontSize={'14px'} color={'#fff'}>
                Почта:
            </Typography>
            <Typography color={'#fff'}>{userInfo.contacts.email || ' - '}</Typography>
        </InfoItem>
    </SpecialistInfoWrapper>
);
