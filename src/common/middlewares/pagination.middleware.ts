import { PaginationDto } from './../dto/pagination.dto';
import { NestMiddleware, MiddlewareFunction, Injectable } from '@nestjs/common';

const logger = require('logger');

const defaultPagination: PaginationDto = {
  pageSize: 10,
  pageNumber: 1
};

class ConfigPagination {
  includes?: string[] = [];
  allowIncludes?: string[] = [];
}

@Injectable()
export class PaginationMiddleware implements NestMiddleware {

  resolve(prePagination: ConfigPagination = {}): MiddlewareFunction {
    return (req, res, next) => {
      logger.debug('Checking pagination data');
      try {
        const pagination = { ...defaultPagination, ...prePagination };

        if (req.query.page) {
          if (req.query.page.size) {
            pagination.pageSize = parseInt(req.query.page.size, 10);
            if (pagination.pageSize < 0) {
              pagination.pageSize = 10;
            }
          }
          if (req.query.page.number) {
            pagination.pageNumber = parseInt(req.query.page.number, 10);
            if (pagination.pageNumber < 0) {
              pagination.pageNumber = 1;
            }
          }
        }
        if (!req.locals) {
          req.locals = {};
        }
        req.locals.pagination = pagination;
        next();
      } catch (err) {
        logger.error(err);
        res.status(403).send('Not authorized');
      }
    };
  }
}
