import React from 'react';
import styled from '@emotion/styled';
import { Button, Gapped, Input } from '@skbkontur/react-ui';
import { ValidationContainer } from '@skbkontur/react-ui-validations';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { FormLine } from '../../../ui/FormLine/FormLine';
import { secondaryText } from '../../../../client-tools/styles/color';

const HeadWrapper = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    height: 50px;
    margin-bottom: 10px;
`;

const FooterWrapper = styled.div`
    background-color: darkgrey;
    height: 50px;
    border-bottom-right-radius: 19px;
    border-bottom-left-radius: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RegistrationPage = observer(() => {
    return (
        <ValidationContainer>
            <Box sx={{ border: `1px solid ${secondaryText}`, borderRadius: 5, marginLeft: 15 }} maxWidth={400}>
                <Box sx={{ padding: 5, paddingTop: 2 }}>
                    <HeadWrapper>Регистрация</HeadWrapper>
                    <Gapped vertical gap={10}>
                        <FormLine caption={'Фамилия имя'}>
                            <Input />
                        </FormLine>
                        <FormLine caption={'Тип профиля'}>
                            <Input />
                        </FormLine>
                        <FormLine caption={'Контактный номер телефона'}>
                            <Input />
                        </FormLine>
                        <FormLine caption={'Электронная почта'}>
                            <Input />
                        </FormLine>
                        <FormLine caption={'Пароль'}>
                            <Input />
                        </FormLine>
                        <FormLine caption={'Подтверждение пароля'}>
                            <Input />
                        </FormLine>
                    </Gapped>
                </Box>
                <FooterWrapper>
                    <Button use={'primary'}>Зарегистрироваться</Button>
                </FooterWrapper>
            </Box>
        </ValidationContainer>
    );
});
