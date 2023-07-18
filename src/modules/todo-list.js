import Sortable from 'sortablejs';
import {
  displayTasks as Display,
  inputEvents as Edit,
  removeTask,
} from './functionality.js';
import Form from './Task-Handle.js';

class Task {
  constructor() {
    this.tasksArray = JSON.parse(localStorage.getItem('todos')) || [];
    this.listContainer = document.querySelector('.nav__items');
  }

  render = () => {
    Form(this.addTask, this.tasksArray, this.render);
    Display(this.tasksArray, this.listContainer);
    Edit(this.tasksArray, this.addTask, this.listContainer, this.render);
    removeTask(this.tasksArray, this.addTask);

    // Initialize Sortable
    this.initializeSortable();
  };

  addTask = (task) => {
    if (task) {
      this.tasksArray.push(task);
      localStorage.setItem('todos', JSON.stringify(this.tasksArray));
    } else {
      localStorage.setItem('todos', JSON.stringify(this.tasksArray));
    }
  };

  swapTasks = (oldIndex, newIndex) => {
    const [task] = this.tasksArray.splice(oldIndex, 1);
    this.tasksArray.splice(newIndex, 0, task);
    localStorage.setItem('todos', JSON.stringify(this.tasksArray));
    this.render();
  };

  initializeSortable = () => {
    const list = this.listContainer;
    Sortable.create(list, {
      animation: 150,
      onEnd: (event) => {
        const { oldIndex, newIndex } = event;
        this.swapTasks(oldIndex, newIndex);
      },
    });
  };
}

export default Task;