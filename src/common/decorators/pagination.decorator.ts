
import { createParamDecorator } from '@nestjs/common';
import { PaginationDto } from 'common/dto/pagination.dto';

export const Pagination = createParamDecorator((data, req): PaginationDto => {
  return req.locals.pagination;
});