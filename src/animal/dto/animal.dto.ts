import { ApiModelProperty } from '@nestjs/swagger';

export class AnimalDto {

  @ApiModelProperty({ required: true, type: String })
  _id: string;

  @ApiModelProperty({ required: true, type: String, maxLength: 50 })
  name: string;

  @ApiModelProperty({ required: true, type: String })
  img: string;

  @ApiModelProperty({ required: true, type: String })
  type: string;

  @ApiModelProperty({ required: false, type: String })
  size?: string;

  @ApiModelProperty({ required: false, type: String, maxLength: 255 })
  description?: string;


  constructor(_id: string, partial: Partial<AnimalDto>) {
    const {name, size, img, type, description} = partial;
    Object.assign(this, {name, size, img, type, description});
    this._id = _id;
  }

}
