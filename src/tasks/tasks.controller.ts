import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('view')
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post('new')
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }
}
