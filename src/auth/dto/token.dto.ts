import { ApiModelProperty } from '@nestjs/swagger';

export class TokenDto {

  
  @ApiModelProperty({ required: true, type: String })
  token: string;


}
