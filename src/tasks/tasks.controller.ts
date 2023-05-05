import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

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

  // @Get('view/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   const task = this.taskService.getTaskById(id);
  //   if (!task) {
  //     throw new NotFoundException(`Not found the post with ${id}`);
  //   }
  //   return task;
  // }

  // @Post('new')
  // createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
  //   return this.taskService.createTask(createTaskDTO);
  // }

  // // @Post('news')
  // // createTasks(@Body('title') title, @Body('description') description): Task {
  // //   return this.taskService.createTasks(title, description);
  // // }
  // @Delete('delete/:id')
  // deleteById(@Param('id') id: string): string {
  //   return this.taskService.deleteTaskById(id);
  // }
  // @Patch('/update/:id')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskDTO: UpdateTaskDTO,
  // ): Task {
  //   return this.taskService.updateTaskById(id, updateTaskDTO);
  // }
}
