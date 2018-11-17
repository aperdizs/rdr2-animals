import { ApiModelProperty } from "@nestjs/swagger";

export class MetaDto {
  @ApiModelProperty({
    description: 'Num total pages',
    type: Number,
  })
  totalPages: number;

  @ApiModelProperty({
    description: 'Num total items',
    type: Number,
  })
  totalItems: number;

  @ApiModelProperty({
    description: 'Size of page',
    type: Number,
  })
  size: number;

  @ApiModelProperty({
    description: 'Number of page',
    type: Number,
  })
  page: number;

  constructor(totalPages: number, totalItems: number, size: number, page: number) {
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.size = size;
    this.page = page;
  }
}
