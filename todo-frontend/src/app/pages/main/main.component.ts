import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { TaskCardComponent } from "../../components/task-card/task-card.component";
import { ViewTask } from '../../interfaces/ViewTask';
import { TaskService } from '../../services/task-service';
import { NgForOf } from '@angular/common';
import { TaskFormComponent } from "../../components/task-form/task-form.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, TaskCardComponent, NgForOf, TaskFormComponent],
  templateUrl: './main.component.html',
  providers: [TaskService],
  styleUrl: './main.component.css'
})
export class MainComponent {
  tasks: ViewTask[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  sortByStatus() {
    this.tasks.sort((a, b) => a.completed ? 1 : -1);

  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.sortByStatus();
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas', error);
      }
    })
  }
}
