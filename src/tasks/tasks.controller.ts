import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasKFilterDTO } from './dto/task-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(@Query() taskFilterDTO: GetTasKFilterDTO): Promise<Task[]> {
    return this.taskService.getAllTasks(taskFilterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post('new')
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createNewTask(createTaskDTO);
  }

  @Delete('delete/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }
  @Patch('/update/:id')
  updateTaskById(@Body() updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    return this.taskService.updateTaskById(updateTaskDTO);
  }
}
