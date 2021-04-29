import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_INSECURE_KEY = 'isInsecure';
export const Insecure = (): CustomDecorator<string> =>
	SetMetadata(IS_INSECURE_KEY, true);
