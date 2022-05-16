import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewTaskModalComponent } from 'src/app/components/new-task-modal/new-task-modal.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  taskInfo!: any; 

  constructor(private dashboardService: DashboardService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTasksData();
  }

  
  newTask(): void {
    const dialogRef = this.dialog.open(NewTaskModalComponent, {
      width: '400px',
      height: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editTask(id: any) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  //retorna o data da requisição
  getTasksData() {
    this.dashboardService.getFirstTask().subscribe(data => {
      this.taskInfo = data as any;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}
