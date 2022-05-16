import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Status } from 'src/app/components/new-task-modal/new-task-modal.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  //status disponíveis para as tarefas
  allStatus = [
    new Status('feito'),
    new Status('parado'),
    new Status('em progresso'),
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.dashboardService.editTask(id))
      )
      .subscribe((task) => this.updateForm(task));

    this.form = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required]],
      owner: [null],
      status: [null],
      date: [null],
    });
  }

  //método de atualização de formulário
  updateForm(task: any) {
    this.form.patchValue({
      id: task.id,
      title: task.title,
      owner: task.owner,
      status: task.owner,
      date: task.date,
    });
  }

  //método de atualização de formulário
  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.form.value.id) {
        this.dashboardService.updateTask(this.form.value).subscribe(
          (success: any) => {
            console.log('criado com sucesso');
            this.location.back();
          },
          (error: any) => console.error(error),
          () => console.log('request completo')
        );
      }
    }
  }

  //cancela a atualização, reseta o formulário e volta para a home
  onCancel() {
    this.form.reset;
    this.location.back();
  }
}
