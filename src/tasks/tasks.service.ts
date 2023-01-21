import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks:number[] = [21, 321];

    getAllTasks() {
        return this.tasks;  
    }
}
