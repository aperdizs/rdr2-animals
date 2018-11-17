import { PaginationInput } from 'graphql.schema';

export class PaginationDto extends PaginationInput {
  pageSize?: number = 10;
  pageNumber?: number = 1;

  constructor(data: Partial<PaginationDto>) {
    super()
    Object.assign(this, data);
  }
}
