import { Injectable } from '@nestjs/common';
import { Task, statusType } from './task.model';
import { v4 as UniqueId } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;
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
