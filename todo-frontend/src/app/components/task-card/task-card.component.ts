import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from '../../services/task-service';
import { MessageComponent } from "../../shared/message/message.component";
import { TaskFormComponent } from "../task-form/task-form.component";
import { MainComponent } from '../../pages/main/main.component';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NgStyle, CommonModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatDialogModule, MatCheckboxModule, MessageComponent, TaskFormComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {

  constructor(private dialog: MatDialog, private taskService: TaskService) { }

  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() completed!: boolean;
  @Input() createdAt!: Date;
  @Input() dueDate!: Date;
  @Input() finishedAt!: Date | null
  @Input() delay: number = 0;
  dialogMessage: string = '';
  expanded = false;
  deleted = false;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  @ViewChild(TaskFormComponent) formComponent!: TaskFormComponent;

  getAnimDelay(): string {
    return `${this.delay}ms`;
  }

  async onToggleCompletionStatus(event: any): Promise<void> {
    const isChecked: boolean = event.checked;

    this.dialogMessage = isChecked
      ? 'Tem certeza de que deseja marcar esta tarefa como concluída?'
      : 'Tem certeza de que deseja reverter o status e marcar a tarefa como não concluída?';


    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '450px',
      height: '200px'
    });

    const userConfirmed = await dialogRef.afterClosed().toPromise();

    if (userConfirmed) {
      this.completed = isChecked;

      this.taskService.updateTask(this.id, { title: undefined, dueDate: undefined, description: undefined, completed: this.completed })
        .subscribe({
          next: () => {
            this.finishedAt = new Date();
            this.messageComponent.message = 'Status alterado com sucesso!';
            this.messageComponent.type = 'success';
            this.messageComponent.show();

            let t = MainComponent.findTaskById(this.id!);
            t!.completed = this.completed;

            MainComponent.updateTask(t!);

            MainComponent.chageIndex(this.completed ? 'down' : 'top', t!);
          },
          error: () => {
            this.finishedAt = null;
            this.messageComponent.message = 'Ocorreu um erro ao alterar status da tarefa!';
            this.messageComponent.type = 'error';
            this.messageComponent.show();
          }
        })
    } else {
      event.source.checked = this.completed;
    }
  }
  editTask() {
    this.formComponent.show({
      id: this.id,
      completed: this.completed,
      createdAt: this.createdAt,
      description: this.description,
      dueDate: this.dueDate,
      finishedAt: this.finishedAt,
      title: this.title
    });
  }

  deleteTask() {
    this.dialogMessage = 'Tem certeza de que deseja excluir esta tarefa?';

    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '450px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.taskService.deleteTask(this.id).subscribe({
          next: (res) => {
            this.deleted = true;
            this.messageComponent.message = 'Tarefa deletada com sucesso!';
            this.messageComponent.type = 'success';
            this.messageComponent.show();
          },
          error: (err) => {
            this.messageComponent.message = 'Ocorreu um erro ao deletar a tarefa!';
            this.messageComponent.type = 'error';
            this.messageComponent.show();
          }
        });
      } else {
      }
    });
  }

  getDaysRemaining(): string {
    const currentDate = new Date();
    const dueDate = new Date(this.dueDate);
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysRemaining < 0) {
      return 'A tarefa está atrasada!';
    } else if (daysRemaining === 0) {
      return 'A tarefa vence hoje!';
    } else {
      return `${daysRemaining} dias restantes`;
    }
  }

}
