import React from 'react';
import styled from '@emotion/styled';
import { Gapped } from '@skbkontur/react-ui';
import { PersonOutline } from '@mui/icons-material';
import { LargeUser } from '../../../../server/modules/domains/users/entities/user.entity';
import { notActiveText } from '../../../client-tools/styles/color';
import { Typography } from '../../ui/Text/Typography';

interface Props {
    user: LargeUser;
}

const SpecialistWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${notActiveText};
  padding: 10px;
`;

export const SpecialistItem: React.FC<Props> = ({ user }) => (
    <SpecialistWrapper>
        <Gapped gap={3} verticalAlign='middle'>
            <PersonOutline sx={{ color: notActiveText }} fontSize={'large'} />
            <Typography color={notActiveText} fontSize={'18px'}>{user.profile?.fullName}</Typography>
        </Gapped>
    </SpecialistWrapper>
);
