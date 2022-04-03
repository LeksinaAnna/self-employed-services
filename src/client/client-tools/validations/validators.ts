import { Nullable } from '@skbkontur/react-ui-validations/typings/Types';
import { ValidationInfo } from '@skbkontur/react-ui-validations/src/ValidationWrapper';

export const isRequiredField = (value: string): Nullable<ValidationInfo> => {
    if (!value || value.length === 0) {
        return { message: 'Поле обязательно для заполнения', type: 'submit' }
    }

    return null;
}

export const validateEmail = (value: string): Nullable<ValidationInfo> => {
    if (!value || !/(@)(.+)$/.test(value)) {
        return { message: 'Поле email не валидно', type: 'submit' }
    }

    return null;
}