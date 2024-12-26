import { Injectable } from '@angular/core';
import { ViewTask } from '../interfaces/ViewTask';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateTask } from '../interfaces/CreateTask';
import { environment } from '../environments/environment';


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
}
