import { IsEnum, IsOptional, IsString } from 'class-validator';
import { statusType } from '../task.model';

export class GetTasKFilterDTO {
  @IsOptional()
  @IsEnum(statusType)
  status?: statusType;
  @IsOptional()
  @IsString()
  search?: string;
}
