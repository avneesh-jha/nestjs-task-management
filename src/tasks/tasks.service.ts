import { Injectable } from '@nestjs/common';
import { Task, statusType } from './task.model';
import { v4 as UniqueId } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasKFilterDTO } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getTasksByFilter(getTaskFilterDTO: GetTasKFilterDTO): Task[] {
    const { status, search } = getTaskFilterDTO;
    let statusa = statusType.DONE;
    console.log(status, search);

    let tasks = this.getAllTasks();
    if (status === statusType.DONE || status === statusType.OPEN) {
      switch (status) {
        case 'done':
          statusa = statusType.DONE;
          break;
        case 'open':
          statusa = statusType.OPEN;
          break;
      }
      tasks = tasks.filter((task) => task.status === statusa);
      return tasks;
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }
    return tasks;
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
  deleteTaskById(id: string): string {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    return found ? 'deleted' : 'not found';
  }

  updateTaskById(id: string, updateTaskDTO: UpdateTaskDTO): Task {
    const { status } = updateTaskDTO;
    return this.tasks.find((task) => {
      if (task.id === id) {
        switch (status) {
          case 'done':
            task.status = statusType.DONE;
            return task;
          case 'in_progress':
            task.status = statusType.IN_PROGRESS;
            return task;
          case 'open':
            task.status = statusType.OPEN;
            return task;
          default:
            return task;
        }
      }
    });
  }
  // createTasks(title: string, description: string) {
  //   // const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: UniqueId(),
  //     title: title,
  //     description: description,
  //     status: statusType.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
