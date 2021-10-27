import { Reflector } from '@nestjs/core';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
	it('should be defined', () => {
		expect(new LoginGuard(new Reflector())).toBeDefined();
	});
});
