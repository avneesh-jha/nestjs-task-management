import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
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
  @Get('view/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post('new')
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }

  // @Post('news')
  // createTasks(@Body('title') title, @Body('description') description): Task {
  //   return this.taskService.createTasks(title, description);
  // }
  @Delete('delete/:id')
  deleteById(@Param('id') id: string): string {
    return this.taskService.deleteTaskById(id);
  }
}
