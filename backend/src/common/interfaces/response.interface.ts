// HTTP response
export interface IHttpResponseBase {
	code: number;
	message: string;
}

// HTTP error
export type THttpErrorResponse = IHttpResponseBase & {
	error?: any;
};

// HTTP success
export type THttpSuccessResponse<T> = IHttpResponseBase & {
	data?: T;
};

// HTTP Response
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;

export type TExceptionOption = string | THttpErrorResponse;
