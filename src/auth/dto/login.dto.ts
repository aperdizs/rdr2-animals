import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {

  @IsString()
  @IsEmail()
  @ApiModelProperty({ required: true, type: String })
  email: string;

  @IsString()
  @MinLength(3)
  @ApiModelProperty({ required: true, minLength: 3, type: String })
  password: string;

}
