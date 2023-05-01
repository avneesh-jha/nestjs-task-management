import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('view')
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post('new')
  createTask(@Body('title') title, @Body('description') description): Task {
    console.log('check it ', title, description);
    return this.taskService.createTask(title, description);
  }
}
