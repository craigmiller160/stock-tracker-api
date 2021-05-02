import { JwtStrategy } from '../../../src/modules/auth/jwt.strategy';
import { JwkService } from '../../../src/modules/auth/jwk.service';
import { MockHttpService } from '../../testutils/mocks/MockHttpService';
import {
	MOCK_CLIENT_KEY,
	MOCK_CLIENT_NAME,
	MockConfigService
} from '../../testutils/mocks/MockConfigService';
import { Claims, TokenDetails } from '../../../src/modules/auth/model/jwt';

jest.mock('../../../src/modules/auth/jwk.service');

const jwkService = new JwkService(
	new MockHttpService(),
	new MockConfigService()
);

const claims: Claims = {
	sub: 'sub',
	lastName: 'lastName',
	clientName: MOCK_CLIENT_NAME,
	roles: [],
	userId: 1,
	firstName: 'firstName',
	nbf: 1,
	clientKey: MOCK_CLIENT_KEY,
	userEmail: 'userEmail',
	exp: 2,
	iat: 3,
	jti: 'jti'
};

const tokenDetails: TokenDetails = {
    lastName: claims.lastName,
    firstName: claims.firstName,
    userEmail: claims.userEmail,
    roles: claims.roles
};

describe('jwt.strategy', () => {
	let jwtStrategy: JwtStrategy;

	beforeEach(() => {
		jwtStrategy = new JwtStrategy(jwkService, new MockConfigService());
	});

	describe('validate', () => {
		it('is valid', () => {
			const result = jwtStrategy.validate(claims);
			expect(result).toEqual(tokenDetails);
		});

		it('has invalid client key', () => {
			throw new Error();
		});

		it('has invalid client name', () => {
			throw new Error();
		});
	});
});
