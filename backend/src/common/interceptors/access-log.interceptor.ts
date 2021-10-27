import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AccessLogInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		context.switchToHttp().getRequest<FastifyRequest>().raw.url;
		return next.handle();
	}
}
