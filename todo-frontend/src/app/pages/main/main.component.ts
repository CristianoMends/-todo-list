import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { TaskCardComponent } from "../../components/task-card/task-card.component";
import { ViewTask } from '../../interfaces/ViewTask';
import { TaskService } from '../../services/task-service';
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { MessageComponent } from "../../shared/message/message.component";
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgStyle, NgClass, HeaderComponent, TaskCardComponent, NgForOf, MatIconModule, TaskFormComponent, MessageComponent, MatDividerModule],
  templateUrl: './main.component.html',
  providers: [TaskService],
  styleUrl: './main.component.css',
})
export class MainComponent implements AfterViewInit {
  static tasks: ViewTask[] = [];

  constructor(private taskService: TaskService) { }

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  @ViewChild(TaskFormComponent) formComponent!: TaskFormComponent;

  ngAfterViewInit(): void {

    if (this.messageComponent) {
      this.messageComponent.message = '';
      this.messageComponent.type = 'info';
    }
  }
  openTaskForm() {
    this.formComponent.show()
  }


  ngOnInit(): void {
    this.loadTasks();
  }

  sortByStatus() {
    MainComponent.tasks.sort((a, b) => a.completed ? 1 : -1);

  }

  getTasks() {
    return MainComponent.tasks;
  }
  sortBy(criteria: 'createdAt' | 'dueDate' | 'completed'): void {
    switch (criteria) {
      case 'createdAt':
        MainComponent.tasks.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;

      case 'dueDate':
        MainComponent.tasks.sort((a, b) =>
          new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime()
        );
        break;

      case 'completed':
        MainComponent.tasks.sort((a, b) =>
          Number(a.completed) - Number(b.completed)
        );
        break;

      default:
        break;
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        MainComponent.tasks = data;
        this.sortByStatus();
        this.messageComponent.message = 'Tarefas carregas com sucesso!';
        this.messageComponent.type = 'success';
        this.messageComponent.show();
      },
      error: (error) => {
        this.messageComponent.message = 'Ocorreu um erro ao carregar as tarefas!';
        this.messageComponent.type = 'error';
        this.messageComponent.show();
      }
    })
  }
  static addTask(task: ViewTask): void {
    this.tasks.push(task);
  }

  static updateTask(updatedTask: ViewTask): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  static deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  static findTaskById(taskId: number): ViewTask | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  static chageIndex(pos: 'top' | 'down', task: ViewTask): void {
    const taskIndex = MainComponent.tasks.findIndex(t => t.id === task.id);

    if (taskIndex !== -1) {
      const [removedTask] = MainComponent.tasks.splice(taskIndex, 1);

      if (pos === 'down') {
        MainComponent.tasks.push(removedTask);
      } else {
        MainComponent.tasks.unshift(removedTask);
      }
    }
  }

}
