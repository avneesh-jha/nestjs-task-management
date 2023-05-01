import { statusType } from '../task.model';

export class GetTasKFilterDTO {
  status?: statusType;
  search?: string;
}
