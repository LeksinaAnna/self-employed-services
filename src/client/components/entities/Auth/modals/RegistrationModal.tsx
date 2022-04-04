import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ValidationContainer, ValidationWrapper, createValidator, tooltip } from '@skbkontur/react-ui-validations';
import { Button, Gapped, Input, Modal, Select } from '@skbkontur/react-ui';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import {
    ProfessionType,
    ProfessionTypeDict,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { Nullable } from '../../../../../common/interfaces/common';
import { FormLine } from '../../../ui/FormLine/FormLine';
import { isRequiredField, validateEmail, validateLengthText } from '../../../../client-tools/validations/validators';

interface RegInfo {
    email: string;
    password: string;
    fullName: string;
    profession: ProfessionType;
}

export const RegistrationModal = observer(() => {
    const { authStore } = useStores();
    const {
        login,
        profession,
        setProfession,
        setLogin,
        password,
        setPassword,
        fullName,
        setFullName,
        isLoading,
        service,
        userProfessionList,
    } = authStore;

    const [container, refContainer] = React.useState<Nullable<ValidationContainer>>(null);

    useEffect(
        () => () => {
            service.destroy();
            refContainer(null);
        },
        [],
    );

    const submitForm = async () => {
        if (await container.validate()) {
            await service.registration();
        }
    };

    return (
        <Modal onClose={service.closeRegistrationModal}>
            <Modal.Header>Регистрация</Modal.Header>
            <Modal.Body>
                <ValidationContainer ref={refContainer}>
                    <Gapped vertical gap={18}>
                        <FormLine caption={'Фамилия Имя'} vertical>
                            <ValidationWrapper validationInfo={isRequiredField(fullName)}>
                                <Input value={fullName} onValueChange={setFullName} />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine caption={'Выберите ваш профиль'} vertical>
                            <ValidationWrapper validationInfo={isRequiredField(profession)}>
                                <Select
                                    width={200}
                                    items={userProfessionList}
                                    value={ProfessionTypeDict[profession]}
                                    onValueChange={setProfession}
                                />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine caption={'Электронная почта'} vertical>
                            <ValidationWrapper validationInfo={validateEmail(login)} renderMessage={tooltip('top center')}>
                                <Input value={login} onValueChange={setLogin} />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine caption={'Пароль'} vertical>
                            <ValidationWrapper validationInfo={validateLengthText(6, password)}>
                                <Input value={password} onValueChange={setPassword} />
                            </ValidationWrapper>
                        </FormLine>
                    </Gapped>
                </ValidationContainer>
            </Modal.Body>
            <Modal.Footer panel>
                <Gapped gap={40}>
                    <Button use="primary" onClick={submitForm} loading={isLoading}>
                        Зарегистрироваться
                    </Button>
                    <Button onClick={service.closeRegistrationModal}>Отмена</Button>
                </Gapped>
            </Modal.Footer>
        </Modal>
    );
});
