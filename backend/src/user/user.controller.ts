import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.service';

export class LoginVO {
	uid: string;
	password: string;
}

@Controller('user')
export class UserController {
	constructor(private authService: AuthService) {}

	@Post('login')
	public async login(@Body() body: LoginVO): Promise<User> {
		const user = await this.authService.validateUser(body.uid, body.password);
		if (user) {
			// can't export password
			const { password, ...tmpUser } = user;
			return tmpUser;
		}
		throw new UnauthorizedException();
	}

  @Post('logout')
	public async logout(): Promise<void> {
		
	}
}
