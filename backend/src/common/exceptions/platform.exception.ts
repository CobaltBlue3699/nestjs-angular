import { StatusCode } from '@constants/error.constant';
import { TExceptionOption } from '@interfaces/response.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @class PlatformException
 * @classdesc defaule 999 -> Server error
 */
export class PlatformException extends HttpException {
	constructor(options: TExceptionOption, statusCode?: HttpStatus) {
		super(options || StatusCode.ERROR, statusCode || StatusCode.ERROR.code);
	}
}
