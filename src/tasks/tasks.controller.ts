import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  // @Get('view')
  // getTasks(@Query() getTaskFilterDTO: GetTasKFilterDTO): Task[] {
  //   if (Object.keys(getTaskFilterDTO).length) {
  //     return this.taskService.getTasksByFilter(getTaskFilterDTO);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  @Post('new')
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createNewTask(createTaskDTO);
  }

  // // @Post('news')
  // // createTasks(@Body('title') title, @Body('description') description): Task {
  // //   return this.taskService.createTasks(title, description);
  // // }
  @Delete('delete/:id')
  deleteById(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTaskById(id);
  }
  // @Patch('/update/:id')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskDTO: UpdateTaskDTO,
  // ): Task {
  //   return this.taskService.updateTaskById(id, updateTaskDTO);
  // }
}
