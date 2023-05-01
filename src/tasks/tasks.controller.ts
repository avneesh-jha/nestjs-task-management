import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasKFilterDTO } from './dto/task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('view')
  getTasks(@Query() getTaskFilterDTO: GetTasKFilterDTO): Task[] {
    if (Object.keys(getTaskFilterDTO).length) {
      return this.taskService.getTasksByFilter(getTaskFilterDTO);
    } else {
      return this.taskService.getAllTasks();
    }
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
  @Patch('/update/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Task {
    return this.taskService.updateTaskById(id, updateTaskDTO);
  }
}
