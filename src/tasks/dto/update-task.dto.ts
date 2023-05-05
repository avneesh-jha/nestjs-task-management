import { IsEnum } from 'class-validator';
import { statusType } from '../task.model';

export class UpdateTaskDTO {
  id: statusType;
  title: string;
  @IsEnum(statusType)
  status: statusType;
}
