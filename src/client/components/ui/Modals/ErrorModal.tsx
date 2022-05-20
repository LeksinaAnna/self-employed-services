import React from 'react';
import { Alert } from '@mui/material';
import { Button } from '@skbkontur/react-ui';
import { Modal, ModalFooter, ModalHead } from './Modal';

interface Props {
    onClose: () => void;
    errorMessage: string;
    buttonTitle?: string;
}

export const ErrorModal: React.FC<Props> = ({ onClose, errorMessage, buttonTitle = 'Закрыть' }) => (
    <Modal onClose={onClose}>
        <ModalHead>Произошла ошибка</ModalHead>

        <Alert severity="error">{errorMessage}</Alert>

        <ModalFooter>
            <Button onClick={onClose}>{buttonTitle}</Button>
        </ModalFooter>
    </Modal>
);