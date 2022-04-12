import React, { useState } from 'react';
import { Button, Gapped, Textarea } from '@skbkontur/react-ui';
import { Alert } from '@mui/material';
import { LargeUser, UserWithDescription } from '../../../../../server/modules/domains/users/entities/user.entity';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modal/Modal';
import { professionTypeDict } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { Typography } from '../../../ui/Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';

interface Props {
    user: LargeUser & UserWithDescription;
    accept: (description: string) => void; // (comment: string) => void;
    close: () => void;
}

export const SpecialistInfoModal: React.FC<Props> = ({ user, accept, close }) => {
    const [commentValue, setCommentValue] = useState<string>(user?.description || '');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onSubmit = async () => {
        setLoading(true);

        try {
            await accept(commentValue);
            close();
        } catch (e) {
            setError(e.message);
        }
        
        setLoading(false);
    };

    return (
        <Modal onClose={close} width={300}>
            <ModalHead>{user?.profile?.fullName}</ModalHead>
            <ModalBody>
                <div style={{ display: 'flex', marginBottom: 10, color: secondaryText }}>
                    <Typography fontSize={'18px'}>Профиль:</Typography>
                    <div style={{ marginLeft: 20 }}>
                        <Typography fontSize={'18px'}>{professionTypeDict[user?.profile?.profession]}</Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', marginBottom: 10, color: secondaryText }}>
                    <Typography fontSize={'18px'}>Почта: </Typography>
                    <div style={{ marginLeft: 20 }}>
                        <Typography fontSize={'18px'}>{user?.email || ' - '}</Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', marginBottom: 10, color: secondaryText }}>
                    <Typography fontSize={'18px'}>Телефон: </Typography>
                    <div style={{ marginLeft: 20 }}>
                        <Typography fontSize={'18px'}>{user?.profile?.contacts?.phone || ' - '}</Typography>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Typography color={secondaryText} fontSize={'18px'}>
                        Комментарий
                    </Typography>
                    <Textarea value={commentValue} onValueChange={setCommentValue} />
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
