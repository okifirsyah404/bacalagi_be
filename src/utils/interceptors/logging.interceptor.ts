import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MainLogger } from '../logger/provider/main-logger.provider';

type LoggingInterceptorSettings = {
  showLog?: boolean;
  exclude?: string[];
};

/**
 * Interceptor for logging request and response.
 *
 * This interceptor will log all request and response to the console.
 *
 * @example
 * app.useGlobalInterceptors(
 *  new LoggingInterceptor(
 *    new MainLogger(),
 *    {
 *      exclude : ['/excluded-end-point']
 *    }
 *  )
 * );
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: MainLogger,
    private setting: LoggingInterceptorSettings | undefined = {
      showLog: true,
      exclude: [],
    },
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (
      this.setting === undefined ||
      this.setting === null ||
      Object.keys(this.setting).length === 0 ||
      this.setting.showLog === undefined
    ) {
      this.setting = {
        showLog: true,
        exclude: this.setting?.exclude ?? [],
      };
    }

    if (!this.setting.showLog) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();

    if (this.setting.exclude !== undefined) {
      if (this.setting.exclude.includes(request.url)) {
        return next.handle();
      }
    }

    this.logger.verbose('------------------ START REQUEST ------------------');
    this.logger.verbose(`|`);
    this.logger.verbose('----------------- REQUEST HEADERS -----------------');
    this.logger.verbose(`|`);
    this.logger.verbose(`|  Url Endpoint: ${request.url}`);
    this.logger.verbose(`|`);
    this.logger.verbose(`|  HTTP Method: ${request.method}`);
    this.logger.verbose(`|`);
    for (const headerName in request.headers) {
      if (request.headers.hasOwnProperty(headerName)) {
        this.logger.verbose(`|  ${headerName}: ${request.headers[headerName]}`);
        this.logger.verbose(`|`);
      }
    }
    if (request.body !== undefined) {
      this.logger.verbose(
        '---------------------- BODY -----------------------',
      );
      this.logger.verbose(`|`);
      const formattedRequestBody = JSON.stringify(request.body, null, 2)
        .split('\n')
        .map((line) => `|  ${line}`);
      formattedRequestBody.forEach((line) => {
        this.logger.verbose(line);
      });
      this.logger.verbose(`|`);
    }

    this.logger.verbose('------------------- END REQUEST -------------------');

    this.logger.verbose(``);
    this.logger.verbose(``);

    return next.handle().pipe(
      tap((responseData) => {
        const formattedResponseBody = JSON.stringify(responseData, null, 2)
          .split('\n')
          .map((line) => `|  ${line}`);
        this.logger.verbose(
          '------------------ START RESPONSE -----------------',
        );
        this.logger.verbose(`|`);
        this.logger.verbose(
          '---------------------- BODY -----------------------',
        );
        this.logger.verbose(`|`);
        formattedResponseBody.forEach((line) => {
          this.logger.verbose(line);
        });
        this.logger.verbose(`|`);
        this.logger.verbose(
          '------------------- END RESPONSE ------------------',
        );

        this.logger.verbose(``);
        this.logger.verbose(``);
      }),
    );
  }
}
