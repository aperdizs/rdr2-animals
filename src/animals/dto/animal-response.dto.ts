import { PaginationDto } from 'common/dto/pagination.dto';
import { AnimalDto } from './animal.dto';
import { ApiModelProperty } from "@nestjs/swagger";
import { MetaDto } from 'common/dto/meta.dto';

export class AnimalResponseDto {

    @ApiModelProperty({ type: AnimalDto, isArray: true })
    data: AnimalDto[];

    meta: MetaDto;

    constructor(data: AnimalDto[], totalItems: number, pagination: PaginationDto) {
        this.data = data;
        this.meta = new MetaDto(Math.ceil(totalItems / pagination.pageSize), totalItems, pagination.pageSize, pagination.pageNumber);
    }

}
