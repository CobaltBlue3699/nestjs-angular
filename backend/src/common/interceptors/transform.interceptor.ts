import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { THttpSuccessResponse } from '@interfaces/response.interface';
import * as META from '@constants/meta.constant';
import { StatusCode } from '@constants/error.constant';

/**
 * @class TransformInterceptor
 * @classdesc when request is succeed process, response will format by this TransformInterceptor.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, THttpSuccessResponse<T>> {
	constructor(private readonly reflector: Reflector) {}
	intercept(context: ExecutionContext, next: CallHandler<T>): Observable<THttpSuccessResponse<T>> {
		const call$ = next.handle();
		const target = context.getHandler();
		const code =
			this.reflector.get<string>(META.HTTP_SUCCESS_RESPONSE_CODE, target) ||
			StatusCode.SUCCESS.code;
		const message =
			this.reflector.get<string>(META.HTTP_SUCCESS_RESPONSE_MESSAGE, target) ||
			StatusCode.SUCCESS.message;
		return call$.pipe(
			map((data) => {
				return { code: Number(code), message, data };
			}),
		);
	}
}
