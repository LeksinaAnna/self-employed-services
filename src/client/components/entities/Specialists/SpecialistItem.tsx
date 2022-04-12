import React from 'react';
import styled from '@emotion/styled';
import { PersonOutline } from '@mui/icons-material';
import { LargeUser } from '../../../../server/modules/domains/users/entities/user.entity';
import { notActiveText, secondaryText } from '../../../client-tools/styles/color';
import { Typography } from '../../ui/Text/Typography';
import { professionTypeDict } from '../../../../server/modules/domains/users/entities/user-profile.entity';

interface Props {
    user: LargeUser;
    openModal: (user: LargeUser) => void;
}

const SpecialistWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${notActiveText};
    padding: 10px;

    &:hover {
        background: rgba(228, 236, 236, 0.5);
        cursor: pointer;
    }
`;

export const SpecialistItem: React.FC<Props> = ({ user, openModal }) => (
    <SpecialistWrapper onClick={() => openModal(user)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 400, alignItems: 'center' }}>
                <PersonOutline sx={{ color: notActiveText }} fontSize={'large'} />
                <Typography color={secondaryText} fontSize={'18px'}>
                    {user.profile?.fullName}
                </Typography>
            </div>
            <Typography color={secondaryText} fontSize={'18px'}>
                {professionTypeDict[user.profile?.profession]}
            </Typography>
        </div>
    </SpecialistWrapper>
);
