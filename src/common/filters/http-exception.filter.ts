import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';

const logger = require('logger');

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = exception && exception.getStatus ? exception.getStatus() : 500;

    if (exception instanceof HttpException) {
      status = (<HttpException>exception).getStatus();
    }
    logger.error(exception);
    if (status === 400) {
      logger.debug(exception.message);
      if (exception.message.message.errors) {
        response
        .status(status)
        .json(exception.message.message);
      } else {
        response
        .status(status)
        .json({ errors: [{
          status: exception.message.statusCode,
          title: exception.message.error,
          detail: exception.message.message,
        }] });
      }
      return;
    }
    if (status > 400 && status < 500) {
      response
        .status(status)
        .json({
          errors: [{
            status,
            title: exception.message.error,
            detail: exception.message.message,
          }],
        });
      return;
    }
    response
      .status(status)
      .json({ errors: [{
        statusCode: status,
        message: 'Generic error',
      }]});
  }
}
