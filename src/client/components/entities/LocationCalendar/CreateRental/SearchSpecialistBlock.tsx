import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ValidationInfo, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Button, Input } from '@skbkontur/react-ui';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { Typography } from '../../../ui/Text/Typography';
import { defaultPortalColor, secondaryText } from '../../../../client-tools/styles/color';
import { Nullable } from '../../../../../common/interfaces/common';
import { Specialist } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { SpecialistItem } from './SpecialistItem';

const ContainerWrapper = styled.div`
    position: relative;
    margin: 5px 0;

    input {
        font-size: 18px;
    }
`;

const ItemsBlock = styled.div`
    position: absolute;
    padding: 10px 0;
    top: 60px;
    display: flex;
    flex-direction: column;
    background: ${defaultPortalColor};
    width: 200px;
    z-index: 100;
    border: 1px solid ${secondaryText};
`;

const SelectedItem = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border: 1px solid ${secondaryText};
`;

interface Props {
    selectedItem: Specialist;
    setSelectedItem: (value: Specialist) => void;
    validation?: () => Nullable<ValidationInfo>;
}

export const SearchSpecialistBlock: React.FC<Props> = ({ selectedItem, setSelectedItem, validation }) => {
    const { commonApi } = useStores();
    const [value, setValue] = useState<string>('');
    const [items, setItems] = useState<Specialist[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useAsyncEffectWithError(
        async abortSignal => {
            if (value) {
                setLoading(true);
                const data = await commonApi.users.getSpecialists({ search: value, take: '5' }, abortSignal);
                setItems(data.items);
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
                        style={{ height: 40 }}
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
                        <div key={user.profileId} onClick={() => setSelectedItem(user)}>
                            <SpecialistItem fullName={user?.fullName} email={user?.contacts.email} />
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
                    <Typography fontSize={'18px'} fontWeight={700} color={secondaryText}>
                        {selectedItem?.fullName}
                    </Typography>
                    <Button use="link" onClick={onClear}>
                        Изменить
                    </Button>
                </SelectedItem>
            )}
        </ContainerWrapper>
    );
};
