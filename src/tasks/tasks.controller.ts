import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService) {}

    @Get()
    getTasks(@Query() filterDto:GetTaskFilterDto): Task[] {
        
        if(Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        } else {
            return this.taskService.getAllTasks()
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): Task[] {
        return this.taskService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)    
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status') status:TaskStatus
    ): Task {
        return this.taskService.updateTaskStatus(id, status);
    }
}
