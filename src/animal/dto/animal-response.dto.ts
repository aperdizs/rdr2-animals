import { AnimalDto } from './animal.dto';
import { ApiModelProperty } from '@nestjs/swagger';
export class AnimalResponseDto {

    @ApiModelProperty({ type: AnimalDto, isArray: true })
    data: AnimalDto[];

    constructor(data: AnimalDto[]) {
        this.data = data;
    }

}
