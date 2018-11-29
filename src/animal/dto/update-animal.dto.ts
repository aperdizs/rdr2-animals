import { IsString, IsOptional, MaxLength, IsUrl } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAnimalDto {

  @IsString()
  @MaxLength(50)
  @IsOptional()
  @ApiModelProperty({ required: false, type: String, maxLength: 50 })
  name: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiModelProperty({ required: false, type: String })
  img: string;

  @IsString()
  // @IsIn()
  @IsOptional()
  @ApiModelProperty({ required: false, type: String })
  type: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ required: false, type: String })
  size: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiModelProperty({ required: false, type: String, maxLength: 255 })
  description: string;

}
