import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { NewTaskModalComponent } from 'src/app/components/new-task-modal/new-task-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/taskModel';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  taskInfo!: any;
  deleteModalRef!: BsModalRef;
  taskDelete!: Task;
  @ViewChild('deleteModal') deleteModal: any;

  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getTasksData();
  }

  //retorna o data da requisição
  getTasksData() {
    this.dashboardService.getFirstTask().subscribe(
      (data) => {
        this.taskInfo = data as any;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  newTask(): void {
    const dialogRef = this.dialog.open(NewTaskModalComponent, {
      width: '400px',
      height: '370px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getTasksData();
    });
  }

  editTask(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  deleteTask(task: any) {
    this.taskDelete = task;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
  }


  onConfirm() {
    this.dashboardService.deleteTask(this.taskDelete.id).subscribe(
      success => {this.getTasksData(), this.deleteModalRef.hide();
      },
      error => console.log(error)
    );
  }

  onCancel() {
    this.deleteModalRef.hide();
  }

}
