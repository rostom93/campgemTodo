import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  /**
   * The URL of the backend service.
   */
  serviceURL: string;

  /**
   * Creates an instance of CrudService.
   * @param {HttpClient} http The Angular HttpClient service to make HTTP requests.
   */
  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks";
  }

  /**
   * Add a new task to the backend server.
   * @param {Task} task The task object to be added.
   * @returns {Observable<Task>} An observable of the added task.
   */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task);
  }

  /**
   * Get all tasks from the backend server.
   * @returns {Observable<Task[]>} An observable of an array of tasks.
   */
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  /**
   * Delete a task from the backend server.
   * @param {Task} task The task object to be deleted.
   * @returns {Observable<Task>} An observable of the deleted task.
   */
  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.serviceURL}/${task.id}`);
  }

  /**
   * Edit a task on the backend server.
   * @param {Task} task The updated task object.
   * @returns {Observable<Task>} An observable of the updated task.
   */
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task);
  }
}
