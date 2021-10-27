import { Injectable } from '@nestjs/common';
import { User, UserService } from 'src/user/user.service';
import { CryptoUtils } from 'src/utils';

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async validateUser(uid: string, pass: string): Promise<User> {
		const user = await this.userService.findUserById(uid);
		if (user && user.password === CryptoUtils.encryptTripleDES(pass)) {
			const { ...result } = user;
			return result;
		}
		return null;
	}
}
