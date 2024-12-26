import { Component, ViewChild } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { CreateTask } from '../../interfaces/CreateTask';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  constructor(private taskService:TaskService){}
  
  @ViewChild('form') form!: NgForm;
  title: string = '';
  description: string = '';
  dueDate: Date | null = null;
  today: Date = new Date();
  
  submit(){
    const task: CreateTask = {title:this.title, description:this.description, dueDate: this.dueDate};
    
    this.taskService.createTask(task).subscribe({
      next:(data)=>{
        console.log('salvo com sucesso!: '+data);
      },
      error:(err)=>{
        console.log('erro: '+err);
      }
    })
    
  }
}

