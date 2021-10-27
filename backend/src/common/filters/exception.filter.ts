import * as lodash from 'lodash';
import { FastifyReply, FastifyRequest } from 'fastify';
// import { Logger } from 'winston';
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { THttpErrorResponse, TExceptionOption } from '../interfaces/response.interface';
import { StatusCode } from '@constants/error.constant';

/**
 * @class HttpExceptionFilter
 * @classdesc 攔截所有異常，並且規範response: THttpErrorResponse
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	// constructor(private readonly logger: Logger) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		// this.logger.error(exception.toString());
		console.log(exception.toString());
		const request = host.switchToHttp().getRequest<FastifyRequest>().raw;
		const response = host.switchToHttp().getResponse<FastifyReply>();
		const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
		try {
			const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
			const errCode = lodash.isString(errorOption)
				? StatusCode.ERROR.code
				: errorOption.code || StatusCode.ERROR.code;
			const errMessage = lodash.isString(errorOption) ? errorOption : errorOption.message;
			const errorInfo = lodash.isString(errorOption) ? null : errorOption.error;
			const parentErrorInfo = errorInfo ? String(errorInfo) : null;
			const isChildrenError = errorInfo && errorInfo.code && errorInfo.msg;
			const resultError = (isChildrenError && errorInfo.msg) || parentErrorInfo;
			const data: THttpErrorResponse = {
				code: errCode,
				message: errMessage,
				error: resultError,
			};

			return response.code(status).send(data);
		} catch (err) {
			return response.code(status).send(StatusCode.ERROR);
		}
	}
}
