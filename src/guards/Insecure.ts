import { SetMetadata } from '@nestjs/common';

export const IS_INSECURE_KEY = 'isInsecure';
export const Insecure = () => SetMetadata(IS_INSECURE_KEY, true);
