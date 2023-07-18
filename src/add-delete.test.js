import { displayTasks, removeTask } from './modules/functionality.js';
import Task from './modules/todo-list.js';

const Tasks = new Task();

document.body.innerHTML = '<ul class="nav__items"></ul>';
const listContainer = document.querySelector('.nav__items');

describe('Test Add Task and local storage', () => {
  window.localStorage = Storage.prototype;
  test('Add new Task', () => {
    const task = {
      index: 0,
      description: 'This is sample test',
      completed: false,
    };
    Tasks.addTask(task);
    displayTasks(Tasks.tasksArray, listContainer);
    expect(Tasks.tasksArray).toHaveLength(1);
  });


});