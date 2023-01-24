import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
const newUuid = uuid.v1() 

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;  
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTask(id: string): Task[] {
       return this.tasks =  this.tasks.filter(task => task.id !== id);
    }

    createTask(createTaskDto: createTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: newUuid,
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
        
}
