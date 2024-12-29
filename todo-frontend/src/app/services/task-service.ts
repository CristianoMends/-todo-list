import { Injectable } from '@angular/core';
import { ViewTask } from '../interfaces/ViewTask';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTask } from '../interfaces/CreateTask';
import { environment } from '../environments/environment';
import { UpdateTask } from '../interfaces/UpdateTask';
import { format } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ViewTask[]> {
    return this.http.get<ViewTask[]>(this.apiUrl + '/api/tasks');
  }
  createTask(task: CreateTask): Observable<void> {
    return this.http.post<any>(this.apiUrl + '/api/tasks', task);
  }
  deleteTask(id: number): Observable<void> {
    return this.http.delete<any>(this.apiUrl + '/api/tasks/' + id);
  }
  updateTask(id: number, task: UpdateTask): Observable<void> {

    let params = new HttpParams();

    if (task.title) {
      params = params.set('title', task.title);
    }
    if (task.description) {
      params = params.set('description', task.description);
    }
    if (task.completed !== undefined) {
      params = params.set('completed', task.completed.toString());
    }
    if (task.dueDate) {
      const formattedDate = format(task.dueDate, 'dd/MM/yyyy');
      params = params.set('dueDate', formattedDate);
    }
    console.log(task.dueDate);

    return this.http.put<void>(`${this.apiUrl}/api/tasks/${id}`, {}, { params });
  }


}
