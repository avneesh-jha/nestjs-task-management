export interface Task {
  id: string;
  title: string;
  description: string;
  status: statusType;
}

enum statusType {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
