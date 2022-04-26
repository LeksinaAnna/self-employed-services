import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '../../../ui/Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';
import { UserProfile } from '../../../../../server/modules/domains/users/entities/user-profile.entity';

interface Props {
    userInfo: UserProfile;
}

const SpecialistInfoWrapper = styled.div`
    padding: 5px;
    margin-top: 5px;
    background: rgba(220, 219, 219, 0.55);
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
            <Typography fontSize={'14px'} color={secondaryText}>
                Арендатор:
            </Typography>
            <Typography color={'rgba(238,116,56,0.75)'}>{userInfo.fullName}</Typography>
        </InfoItem>
        <InfoItem>
            <Typography fontSize={'14px'} color={secondaryText}>
                Телефон:
            </Typography>
            <Typography color={'rgba(238,116,56,0.75)'}>{userInfo.contacts.phone || ' - '}</Typography>
        </InfoItem>
        <InfoItem>
            <Typography fontSize={'14px'} color={secondaryText}>
                Почта:
            </Typography>
            <Typography color={'rgba(238,116,56,0.75)'}>{userInfo.contacts.email || ' - '}</Typography>
        </InfoItem>
    </SpecialistInfoWrapper>
);
