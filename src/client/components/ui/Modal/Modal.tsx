import React from 'react';
import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { BackgroundContainer } from '../Containers/BackgroundContainer';
import { notActiveText } from '../../../client-tools/styles/color';

interface Props {
    width?: number | string;
    children?: React.ReactNode;
    onClose?: () => void;
}

const CloseButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
`;

export const Modal: React.FC<Props> = ({ width = 350, children, onClose }) =>
    (
        <BackgroundContainer marginTop={'20vh'}>
            <Box
                width={width}
                height={300}
                sx={{ backgroundColor: '#fff', position: 'relative' }}
            >
                <CloseButtonWrapper>
                    <IconButton onClick={onClose}>
                        <Close color='action' />
                    </IconButton>
                </CloseButtonWrapper>
                {children}
            </Box>
        </BackgroundContainer>
    );

interface HeadProps {
    children: React.ReactNode;
}

const HeadWrapper = styled.div`
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${notActiveText};
  border-bottom: 1px solid #222;
  opacity: 0.5;
  height: 50px;
`;

export const ModalHead: React.FC<HeadProps> = ({ children }) => <HeadWrapper>{children}</HeadWrapper>;

interface BodyProps {
    children: React.ReactNode;
}

const BodyWrapper = styled.div`
  padding: 20px;
`;

export const ModalBody: React.FC<BodyProps> = ({ children }) => <BodyWrapper>{children}</BodyWrapper>;

interface FooterProps {
    children: React.ReactNode;
}

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 10px 20px;
`;

export const FooterModal: React.FC<FooterProps> = ({ children }) => <FooterWrapper>{children}</FooterWrapper>;
