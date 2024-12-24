import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatDialogModule, MatCheckboxModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {

  constructor(private dialog: MatDialog) { }

  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() completed!: boolean;
  @Input() createdAt!: Date;
  @Input() dueDate!: Date;
  @Input() finishedAt!: Date | null

  expanded = false;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  async onToggleChange(event: any): Promise<void> {
    const isChecked = event.checked;

    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '450px'
    });

    const userConfirmed = await dialogRef.afterClosed().toPromise();

    if (userConfirmed) {
      this.completed = isChecked;
      this.finishedAt = isChecked ? new Date() : null;

    } else {
      event.source.checked = this.completed;
    }
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
