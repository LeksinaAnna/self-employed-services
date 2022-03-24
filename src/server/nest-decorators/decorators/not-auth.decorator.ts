import { SetMetadata } from '@nestjs/common';

export const IS_NOT_AUTH_KEY = 'IS_NOT_AUTH_KEY';
export const NotAuthDecorator = () => SetMetadata(IS_NOT_AUTH_KEY, true);
