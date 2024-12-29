import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { CreateTask } from '../../interfaces/CreateTask';
import { MainComponent } from '../../pages/main/main.component';
import { NgIf } from '@angular/common';
import { MessageComponent } from "../../shared/message/message.component";
import { UpdateTask } from '../../interfaces/UpdateTask';
import { ViewTask } from '../../interfaces/ViewTask';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatIconModule,
    MessageComponent
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  constructor(
    private taskService: TaskService
  ) { }

  @ViewChild('form') form!: NgForm;
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  id: number | undefined = undefined;
  title: string = '';
  description: string = '';
  dueDate: Date | undefined = undefined;
  completed: boolean | undefined = undefined
  today: Date = new Date();

  visible: boolean = false;
  isVisible() {
    return this.visible;
  }
  show(task?: ViewTask) {
    if (task) {
      this.id = task.id;
      this.description = task.description;
      this.title = task.title;
      this.dueDate = task.dueDate;
    }
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
  onFormClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  submit() {
    if (!this.id) {
      const task: CreateTask = { title: this.title, description: this.description, dueDate: this.dueDate };

      this.taskService.createTask(task).subscribe({
        next: (data) => {

          this.taskService.getTasks().subscribe({
            next: (res) => {
              MainComponent.tasks.unshift(res[res.length - 1]);
              this.messageComponent.message = 'Tarefa criada com sucesso!';
              this.messageComponent.type = 'success';
              this.messageComponent.show();
            }
          });
        },
        error: (err) => {
          this.messageComponent.message = 'Ocorreu um erro ao criar a tarefa!';
          this.messageComponent.type = 'error';
          this.messageComponent.show();
        }
      });
    } else {
      const task: UpdateTask = { title: this.title, description: this.description, completed: this.completed, dueDate: this.dueDate };
      this.taskService.updateTask(this.id, task).subscribe({
        next: () => {
          this.messageComponent.message = 'Tarefa atualizada com sucesso!';
          this.messageComponent.type = 'success';
          this.messageComponent.show();

          let t = MainComponent.findTaskById(this.id!);
          t!.title = this.title;
          t!.description = this.description;
          t!.dueDate = this.dueDate!;

          MainComponent.updateTask(t!);
        },
        error: () => {
          this.messageComponent.message = 'Ocorreu um erro ao atualizar a tarefa!';
          this.messageComponent.type = 'error';
          this.messageComponent.show();
        }
      });
    }
  }
}
