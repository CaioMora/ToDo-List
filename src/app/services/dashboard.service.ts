import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  //readonly do endereço da API
  private readonly API = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // GET na API para que retorne todas as tarefas registradas no db.json
  getFirstTask() {
    return this.http.get<Task>(`${this.API}`).pipe(delay(2000));
  }

  //POST na API para que crie novas tarefas
  createTask(task: any) {
    return this.http.post(`${this.API}`, task).pipe(take(1));
  }

  //GET de id da tarefa
  editTask(id: any) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  //PUT na API para editar uma tarefa com base no id selecionado
  updateTask(task: any) {
    return this.http.put(`${this.API}/${task.id}`, task).pipe(take(1));
  }

  //DELETE na API para excluir uma tarefa
  deleteTask(id: any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
