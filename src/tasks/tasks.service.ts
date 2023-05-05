import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { statusType } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createNewTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`not found any task with the given id ${id}`);
    }
    return;
  }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksByFilter(getTaskFilterDTO: GetTasKFilterDTO): Task[] {
  //   const { status, search } = getTaskFilterDTO;
  //   let statusa = statusType.DONE;
  //   console.log(status, search);
  //   let tasks = this.getAllTasks();
  //   if (status === statusType.DONE || status === statusType.OPEN) {
  //     switch (status) {
  //       case 'done':
  //         statusa = statusType.DONE;
  //         break;
  //       case 'open':
  //         statusa = statusType.OPEN;
  //         break;
  //     }
  //     tasks = tasks.filter((task) => task.status === statusa);
  //     return tasks;
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // deleteTaskById(id: string): string {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //   return found ? 'deleted' : 'not found';
  // }
  // updateTaskById(id: string, updateTaskDTO: UpdateTaskDTO): Task {
  //   const { status } = updateTaskDTO;
  //   return this.tasks.find((task) => {
  //     if (task.id === id) {
  //       switch (status) {
  //         case 'done':
  //           task.status = statusType.DONE;
  //           return task;
  //         case 'in_progress':
  //           task.status = statusType.IN_PROGRESS;
  //           return task;
  //         case 'open':
  //           task.status = statusType.OPEN;
  //           return task;
  //         default:
  //           return task;
  //       }
  //     }
  //   });
  // }
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
