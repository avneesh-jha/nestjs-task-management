import { Injectable } from '@nestjs/common';
import { Task, statusType } from './task.model';
import { v4 as UniqueId } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(title: string, description: string) {
    const task: Task = {
      id: UniqueId(),
      title: title,
      description: description,
      status: statusType.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
