import { HttpException } from '@nestjs/common';
import { StatusCode } from '@constants/error.constant';
import { TExceptionOption } from '@interfaces/response.interface';

/**
 * @class HttpBadRequestError
 * @classdesc 400 -> bad request.
 */
export class HttpBadRequestException extends HttpException {
	constructor(error?: TExceptionOption) {
		super(error || StatusCode.BAD_REQUEST, StatusCode.BAD_REQUEST.code);
	}
}
