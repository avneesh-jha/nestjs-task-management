import { IsEnum } from 'class-validator';
import { statusType } from '../task.model';

export class UpdateTaskDTO {
  // title: string;
  // description: string;
  @IsEnum(statusType)
  status: statusType;
}
