import { IsOptional, IsString } from 'class-validator';
import { AnimalFiltersInput } from 'graphql.schema';

export class AnimalFiltersDto extends AnimalFiltersInput {

  @IsString()
  @IsOptional()
  type: string;

}
