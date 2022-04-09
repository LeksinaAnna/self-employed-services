import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '../../../../ui/Text/Typography';
import { secondaryText } from '../../../../../client-tools/styles/color';
interface Props {
    fullName: string;
    email: string;
}

const ItemWrapper = styled.div`
  padding: 5px 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

export const SpecialistItem: React.FC<Props> = ({ email, fullName }) => (
    <ItemWrapper>
        <Typography color={'#fff'}>{fullName}</Typography>
        <Typography color={secondaryText} fontSize={'12px'}>{email}</Typography>
    </ItemWrapper>
);