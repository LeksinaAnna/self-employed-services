import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ValidationInfo, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Button, Input } from '@skbkontur/react-ui';
import { LargeUser } from '../../../../../../server/modules/domains/users/entities/user.entity';
import { useAsyncEffectWithError } from '../../../../../client-tools/hooks/use-async-effect';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { Typography } from '../../../../ui/Text/Typography';
import { secondaryText } from '../../../../../client-tools/styles/color';
import { Nullable } from '../../../../../../common/interfaces/common';
import { SpecialistItem } from './SpecialistItem';

const ContainerWrapper = styled.div`
    position: relative;
    margin: 5px 0;

    input {
        color: #fff;
        font-weight: 700;
        font-size: 18px;
    }
`;

const ItemsBlock = styled.div`
    position: absolute;
    padding: 10px 0;
    top: 60px;
    display: flex;
    flex-direction: column;
    background: #c5c5c5;
    width: 200px;
    z-index: 100;
    border: 1px solid ${secondaryText};
`;

const SelectedItem = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #c5c5c5;
    border: 1px solid ${secondaryText};
`;

interface Props {
    selectedItem: LargeUser;
    setSelectedItem: (value: LargeUser) => void;
    validation?: () => Nullable<ValidationInfo>;
}

export const SearchSpecialistBlock: React.FC<Props> = ({ selectedItem, setSelectedItem, validation }) => {
    const { commonApi } = useStores();
    const [value, setValue] = useState<string>('');
    const [items, setItems] = useState<LargeUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useAsyncEffectWithError(
        async abortSignal => {
            if (value) {
                setLoading(true);
                const response = await commonApi.users.getSpecialists({ search: value, take: '5' }, abortSignal);
                setItems(response.items);
                setLoading(false);
            }
        },
        [value],
    );

    const onClear = () => {
        setSelectedItem(null);
    };

    return (
        <ContainerWrapper>
            <Typography color={'#fff'} fontSize={'14px'}>
                Арендатор
            </Typography>
            {!selectedItem && validation && (
                <ValidationWrapper validationInfo={validation()}>
                    <Input
                        width={220}
                        style={{ backgroundColor: '#c5c5c5', height: 40 }}
                        value={value}
                        onValueChange={setValue}
                    />
                </ValidationWrapper>
            )}
            {!selectedItem && !validation && (
                <Input
                    width={220}
                    style={{ backgroundColor: '#c5c5c5', height: 40 }}
                    value={value}
                    onValueChange={setValue}
                />
            )}
            {!selectedItem && value && (
                <ItemsBlock>
                    {items.map(user => (
                        <div key={user.accountId} onClick={() => setSelectedItem(user)}>
                            <SpecialistItem fullName={user?.profile?.fullName} email={user?.email} />
                        </div>
                    ))}
                    {items.length === 0 && (
                        <Typography color={'#fff'}>
                            <div style={{ marginLeft: 10 }}>Мастер не найден :(</div>
                        </Typography>
                    )}
                </ItemsBlock>
            )}
            {selectedItem && (
                <SelectedItem>
                    <Typography fontSize={'18px'} fontWeight={700} color={'#fff'}>
                        {selectedItem?.profile?.fullName}
                    </Typography>
                    <Button use="link" onClick={onClear}>
                        Изменить
                    </Button>
                </SelectedItem>
            )}
        </ContainerWrapper>
    );
};
