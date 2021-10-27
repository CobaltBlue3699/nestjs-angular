import { THttpSuccessResponse, THttpErrorResponse } from '@interfaces/response.interface';

export class StatusCode {
	public static readonly SUCCESS: THttpSuccessResponse<any> = { code: 0, message: 'success' };
	public static readonly ERROR: THttpErrorResponse = { code: 999, message: 'server error' };
	public static readonly BAD_REQUEST: THttpErrorResponse = { code: 400, message: 'bad request' };
	public static readonly PARAMS_ERROR: THttpErrorResponse = {
		code: 225,
		message: 'parameter error',
	};

	public static readonly FORBIDDEN: THttpErrorResponse = { code: 403, message: 'no premission' };
	public static readonly NOT_FOUND: THttpErrorResponse = {
		code: 404,
		message: 'resource not found',
	};

	public static codeToMessage(code: number): string {
		for (const key of Object.keys(this)) {
			if (this[key].CODE === code) {
				return this[key].message;
			}
		}
		return '';
	}

	public static hasCode(code: number): boolean {
		for (const key of Object.keys(this)) {
			if (this[key].code === code) {
				return true;
			}
		}
		return false;
	}
}
