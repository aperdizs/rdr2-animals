import { IsString, MaxLength, IsUrl, IsIn, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateAnimalInput } from 'graphql.schema';

export class CreateAnimalDto extends CreateAnimalInput {

  @IsString()
  @MaxLength(50)
  @ApiModelProperty({ required: true, type: String, maxLength: 50 })
  name: string;

  @IsString()
  @IsUrl()
  @ApiModelProperty({ required: true, type: String })
  img: string;

  @IsString()
  // @IsIn()
  @ApiModelProperty({ required: true, type: String })
  type: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ required: false, type: String })
  size?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiModelProperty({ required: false, type: String, maxLength: 255 })
  description?: string;

}
