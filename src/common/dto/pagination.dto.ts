export class PaginationDto {
    pageSize?: number = 10;
    pageNumber?: number = 1;

    constructor(data: Partial<PaginationDto>) {
        Object.assign(this, data);
    }
}