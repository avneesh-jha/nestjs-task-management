import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasKFilterDTO } from './dto/task-filter.dto';
import { User } from 'src/auth/user.entitiy';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  createNewTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected == 0) {
      throw new NotFoundException(`not found any task with the given id ${id}`);
    }
  }
  getAllTasks(
    taskFilterTaskDto: GetTasKFilterDTO,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getAllTasks(taskFilterTaskDto, user);
  }
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
  updateTaskById(updateTaskDTO: UpdateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.updateTaskById(updateTaskDTO, user);
  }
}
