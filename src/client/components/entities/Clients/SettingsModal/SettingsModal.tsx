import React, { useState } from 'react';
import { Button, Gapped, Textarea } from '@skbkontur/react-ui';
import { Alert } from '@mui/material';
import { Client } from '../../../../../server/modules/domains/clients/entities/client.entity';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modals/Modal';
import { secondaryText } from '../../../../client-tools/styles/color';
import { Typography } from '../../../ui/Text/Typography';

interface Props {
    client: Client;
    accept: (description: string) => void; // (comment: string) => void;
    close: () => void;
}

export const SettingsModal: React.FC<Props> = ({ client, close, accept }) => {
    const [comment, setComment] = useState(client?.description || '');
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onSubmit = async () => {
        setLoading(true);

        try {
            await accept(comment);
            close();
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };
    
    return (
        <Modal onClose={close} width={300}>
            <ModalHead>{client?.name}</ModalHead>
            <ModalBody>
                <div style={{ display: 'flex', marginBottom: 10, color: secondaryText }}>
                    <Typography fontSize={'18px'}>Почта: </Typography>
                    <div style={{ marginLeft: 20 }}>
                        <Typography fontSize={'18px'}>{client?.email || ' - '}</Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', marginBottom: 10, color: secondaryText }}>
                    <Typography fontSize={'18px'}>Телефон: </Typography>
                    <div style={{ marginLeft: 20 }}>
                        <Typography fontSize={'18px'}>{client?.phone || ' - '}</Typography>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Typography color={secondaryText} fontSize={'18px'}>
                        Комментарий
                    </Typography>
                    <Textarea value={comment} onValueChange={setComment} />
                </div>
            </ModalBody>
            {error && <Alert severity="error">{error}</Alert>}
            <ModalFooter>
                <Gapped gap={20}>
                    <Button use="success" onClick={onSubmit} loading={loading}>
                        Сохранить
                    </Button>
                    <Button onClick={close}>Закрыть</Button>
                </Gapped>
            </ModalFooter>
        </Modal>
    );
};