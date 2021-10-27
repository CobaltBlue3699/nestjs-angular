import { IS_PUBLIC } from '@constants/meta.constant';
import { SetMetadata } from '@nestjs/common';

/**
 * example:
 *
 * 1.
 * 		@Public()
 * 		@Controller()
 * 		export class SomeController {
 *				// all request handler is public
 * 		}
 * 2.
 * 		@Controller()
 * 		export class SomeController {
 *				@Public()
 *				@Get()
 *				public someHandler() {
 *					// this handler is public
 *				}
 * 		}
 */
export const Public = () => SetMetadata(IS_PUBLIC, true);
