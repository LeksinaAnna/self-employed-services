import { Nullable } from '@skbkontur/react-ui-validations/typings/Types';
import { ValidationInfo } from '@skbkontur/react-ui-validations/src/ValidationWrapper';

export const isRequiredField = (value: string): Nullable<ValidationInfo> => {
    if (!value || value.length === 0) {
        return { message: 'Поле обязательно для заполнения', type: 'lostfocus' }
    }

    return null;
}

export const validateEmail = (value: string): Nullable<ValidationInfo> => {
    if (!value || !/^[a-z]+@[a-z]+.[a-z]+$/.test(value)) {
        return { message: 'Поле email не валидно', type: 'submit' }
    }

    return null;
}

const isValidPhone = (value: string): Nullable<ValidationInfo> => {
    if (!/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(value)) {
        return { message: 'Номер телефона невалиден', type: 'submit' }
    }

    return null;
};


export const validateLengthText = (length: number, value: string): Nullable<ValidationInfo> => {
    if (value.length < length) {
        return { message: `Длина значения должна быть больше ${length}`, type: 'submit' }
    }

    return null;
}