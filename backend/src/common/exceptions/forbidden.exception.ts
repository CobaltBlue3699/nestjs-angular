import { StatusCode } from '@constants/error.constant';
import { TExceptionOption } from '@interfaces/response.interface';
import { PlatformException } from './platform.exception';

/**
 * @class HttpForbiddenError
 * @classdesc 403 -> no premission.
 */
export class HttpForbiddenException extends PlatformException {
	constructor(error?: TExceptionOption) {
		super(error || StatusCode.FORBIDDEN, StatusCode.FORBIDDEN.code);
	}
}
