import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';

export class Status {
  constructor(public status: string) {}
}

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
})
export class NewTaskModalComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  //status disponíveis para as tarefas
  allStatus = [
    new Status('feito'),
    new Status('parado'),
    new Status('em progresso'),
  ];

  constructor(
    public dialogRef: MatDialogRef<NewTaskModalComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      owner: [null],
      status: [null],
      date: [null],
    });
  }

  //método de POST para criar uma nova tarefa
  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.dashboardService.createTask(this.form.value).subscribe(
        (success: any) => {
          console.log('criado com sucesso'), this.dialogRef.close();
        },
        (error: any) => console.error(error),
        () => console.log('request completo')
      );
    }
  }

  //cancela a criação de tarefa, reseta o form e fecha a modal
  onCancel() {
    this.form.reset;
    this.dialogRef.close();
  }
}
