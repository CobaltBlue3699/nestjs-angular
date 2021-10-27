import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'fastify-helmet';
import { readFileSync } from 'fs';
import { LoginGuard } from './common/guards/login.guard';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@filters/exception.filter';

// Middleware -> Interceptors -> Route Handler -> Interceptors -> Exception Filter (if exception is thrown)

console.log(process.env.NODE_ENV);

async function bootstrap() {
	const httpsOptions = {
		key: readFileSync('./secrets/private-key.pem'),
		cert: readFileSync('./secrets/public-certificate.pem'),
	};

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({ logger: true, https: httpsOptions }),
	);

	// plugin
	app.register(helmet);

	//filter
	app.useGlobalFilters(new HttpExceptionFilter());

	//interceptor
	app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));

	//guards
	app.useGlobalGuards(new LoginGuard(new Reflector()));

	// swagger
	// const config = new DocumentBuilder()
	// 	.setTitle('nest example')
	// 	.setDescription('The demo API description')
	// 	.setVersion('1.0.0')
	// 	.addTag('測試版本')
	// 	.build();
	// const document = SwaggerModule.createDocument(app, config);
	// SwaggerModule.setup('docs', app, document);

	await app.listen(3000, '0.0.0.0');
}

bootstrap().catch(err => {
  // 當有例外時關閉process
  // TODO: server.log
  process.exit(1);
});
