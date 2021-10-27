import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from '@constants/meta.constant';

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}
		return this.validate(context.switchToHttp().getRequest<FastifyRequest>());
	}

	validate(req: FastifyRequest): boolean | Promise<boolean> | Observable<boolean> {
		return true;
	}
}
