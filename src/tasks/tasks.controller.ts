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
import { User } from 'src/auth/user.entitiy';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(
    @Query() taskFilterDTO: GetTasKFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getAllTasks(taskFilterDTO, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post('new')
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createNewTask(createTaskDTO, user);
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
