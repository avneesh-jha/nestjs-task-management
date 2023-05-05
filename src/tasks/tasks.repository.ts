import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { statusType } from './task.model';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';
import { GetTasKFilterDTO } from './dto/task-filter.dto';
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.create({
      title,
      description,
      status: statusType.OPEN,
    });
    await this.save(task);

    return task;
  }
  async getAllTasks(taskFilterDTO: GetTasKFilterDTO): Promise<Task[]> {
    const { status, search } = taskFilterDTO;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status=  :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async updateTaskById(updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const { id, status, title } = updateTaskDTO;
    const task = await this.getTaskById(id);
    task.status = status;
    task.title = title;
    await this.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }
}
