import { IsEnum, IsOptional } from 'class-validator';
import { statusType } from '../task.model';

export class UpdateTaskDTO {
  id: string;
  @IsOptional()
  title: string;
  @IsEnum(statusType)
  status: statusType;
}
