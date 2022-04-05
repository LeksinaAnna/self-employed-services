import React from 'react';
import { observer } from 'mobx-react-lite';
import { ValidationContainer, ValidationInfo, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Gapped, Input, Select } from '@skbkontur/react-ui';
import styled from '@emotion/styled';
import { FormLine } from '../../../../ui/FormLine/FormLine';
import { Nullable } from '../../../../../../common/interfaces/common';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { professionTypeDict } from '../../../../../../server/modules/domains/users/entities/user-profile.entity';
import {
    isRequiredField,
    validateEmail,
    validateLengthText,
    validatePhone,
} from '../../../../../client-tools/validations/validators';

export const BodyPage = styled.div`
    padding: 20px;
`;

export const Body = observer(() => {
    const {
        refContainer,
        login,
        profession,
        setProfession,
        setLogin,
        password,
        setPassword,
        fullName,
        setFullName,
        userProfessionList,
        phone,
        setPhone
    } = useStores().authStore;

    const [acceptPwd, setAcceptPwd] = React.useState<string>('');

    const checkPwd = (): Nullable<ValidationInfo> => {
        if (acceptPwd !== password) {
            return { message: 'Пароль не совпадает', type: 'submit' }
        }
    }

    return (
        <BodyPage>
            <ValidationContainer ref={refContainer}>
                <Gapped vertical gap={10}>
                    <FormLine caption={'Фамилия имя'}>
                        <ValidationWrapper validationInfo={isRequiredField(fullName)}>
                            <Input placeholder={'ФИО'} value={fullName} onValueChange={setFullName} />
                        </ValidationWrapper>
                    </FormLine>
                    <FormLine caption={'Тип профиля'}>
                        <ValidationWrapper validationInfo={isRequiredField(profession)}>
                            <Select
                                width={200}
                                items={userProfessionList}
                                value={professionTypeDict[profession]}
                                onValueChange={setProfession}
                            />
                        </ValidationWrapper>
                    </FormLine>
                    <FormLine caption={'Контактный номер телефона'}>
                        <ValidationWrapper validationInfo={validatePhone(phone)}>
                            <Input mask={'+7 999 999-99-99'} value={phone} onValueChange={setPhone} />
                        </ValidationWrapper>
                    </FormLine>
                    <FormLine caption={'Электронная почта'}>
                        <ValidationWrapper validationInfo={validateEmail(login)}>
                            <Input placeholder={'example@gmail.com'} value={login} onValueChange={setLogin} />
                        </ValidationWrapper>
                    </FormLine>
                    <FormLine caption={'Пароль'}>
                        <ValidationWrapper validationInfo={validateLengthText(6, password)}>
                            <Input type='password' value={password} onValueChange={setPassword} />
                        </ValidationWrapper>
                    </FormLine>
                    <FormLine caption={'Подтверждение пароля'}>
                        <ValidationWrapper validationInfo={checkPwd()}>
                            <Input type='password' value={acceptPwd} onValueChange={setAcceptPwd} />
                        </ValidationWrapper>
                    </FormLine>
                </Gapped>
            </ValidationContainer>
        </BodyPage>
    );
});
