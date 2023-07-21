import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * The task object used for adding and editing tasks.
   */
  taskObj: Task = new Task();

  /**
   * An array to hold all the tasks.
   */
  tasks: Task[] = [];

  /**
   * The value used to store the task name when adding a new task.
   */
  addTaskValue: string = '';

  /**
   * The value used to store the task name when editing an existing task.
   */
  editTaskValue: string = '';

  /**
   * Creates an instance of DashboardComponent.
   * @param {CrudService} crudService The CRUD service to interact with tasks.
   * @param {Router} router The Angular Router service to handle navigation.
   */
  constructor(private crudService: CrudService, private router: Router) { }

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.getAllTask();
  }

  /**
   * Navigates to the TaskDetailsComponent to view task details.
   * @param {Task} task The task for which the details will be displayed.
   */
  viewTaskDetails(task: Task) {
    const taskName = task.task_name;
    const description = task.description;
    this.router.navigate(['/task-details', taskName, description]);
  }

  /**
   * Fetches all tasks from the server.
   */
  getAllTask() {
    this.crudService.getAllTask().subscribe(
      res => {
        this.tasks = res;
      },
      err => {
        alert("Unable to get list of tasks");
      }
    );
  }

  /**
   * Adds a new task to the server.
   */
  addTask() {
    // Check if the task name is not empty
    if (this.addTaskValue.trim() === '') {
      alert("Task name cannot be empty.");
      return; // Exit the function if the task name is empty
    }

    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.status = 'todo';

    this.crudService.addTask(this.taskObj).subscribe(
      () => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  /**
   * Edits an existing task on the server.
   */
  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      () => {
        this.ngOnInit();
      },
      (err) => {
        alert("Failed to update task");
      }
    );
  }

  /**
   * Deletes a task from the server.
   * @param {Task} etask The task to be deleted.
   */
  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      () => {
        this.ngOnInit();
      },
      (err) => {
        alert("Failed to delete task");
      }
    );
  }

  /**
   * Sets the selected task for editing.
   * @param {Task} etask The task to be edited.
   */
  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

  /**
   * Changes the status of a task and updates it on the server.
   * @param {Task} task The task whose status will be changed.
   * @param {string} newStatus The new status of the task ('todo', 'inprogress', or 'completed').
   */
  changeStatus(task: Task, newStatus: string) {
    task.status = newStatus;
    this.crudService.editTask(task).subscribe(
      () => {
        this.getAllTask();
      },
      (err) => {
        alert("Failed to update task");
      }
    );
  }

  /**
   * Returns an array of tasks with status 'todo'.
   * @returns {Task[]} An array of tasks with status 'todo'.
   */
  getToDoTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'todo');
  }

  /**
   * Returns an array of tasks with status 'inprogress'.
   * @returns {Task[]} An array of tasks with status 'inprogress'.
   */
  getInProgressTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'inprogress');
  }

  /**
   * Returns an array of tasks with status 'completed'.
   * @returns {Task[]} An array of tasks with status 'completed'.
   */
  getCompletedTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'completed');
  }
}
