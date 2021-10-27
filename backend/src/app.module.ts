import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			// static folder is build by frontend
			rootPath: join(__dirname, '../', 'static'),
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: true,
		}),
		LoggerModule,
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule {}
