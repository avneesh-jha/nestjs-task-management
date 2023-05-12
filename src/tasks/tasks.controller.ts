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
// import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // private logger = new Logger('Task-COntroller');
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(
    @Query() taskFilterDTO: GetTasKFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    //  this.logger.log(`yeah ${user.username}`);
    return this.taskService.getAllTasks(taskFilterDTO, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post('new')
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createNewTask(createTaskDTO, user);
  }

  @Delete('delete/:id')
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }
  @Patch('/update/:id')
  updateTaskById(
    @Body() updateTaskDTO: UpdateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskById(updateTaskDTO, user);
  }
}
