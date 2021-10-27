import { Injectable } from '@nestjs/common';

export class User {
	uid: string;
	password?: string;
	nickname: string;
	avatarUrl: string;
}

@Injectable()
export class UserService {
	users: User[] = [
		{
			uid: 'john',
			password: 'BPA+s55Qjy8=', // 123456 3DES
			nickname: 'hi, john',
			avatarUrl:
				'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
		},
		{
			uid: 'westly',
			password: 'BPA+s55Qjy8=',
			nickname: 'hi, westly',
			avatarUrl:
				'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_avatar_people_person_white_tone_icon_159370.png',
		},
		{
			uid: 'wendy',
			password: 'BPA+s55Qjy8=',
			nickname: 'hi, wendy',
			avatarUrl:
				'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_avatar_people_person_white_tone_icon_159370.png',
		},
	];

	async findUserById(id: string): Promise<User> {
		return this.users.find((user) => user.uid === id);
	}
}
