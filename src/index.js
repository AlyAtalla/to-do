import './style.css';
import Sortable from 'sortablejs';

const tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 }
];

const todoList = document.getElementById('todo-list');

function renderTasks() {
  todoList.innerHTML = ''; // Clear previous tasks

  tasks.sort((a, b) => a.index - b.index); // Sort tasks based on index

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      renderTasks();
    });

    const taskText = document.createElement('span');
    taskText.classList.add('todo-item__text');
    taskText.textContent = task.description;

    const handle = document.createElement('span');
    handle.classList.add('drag-handle');
    handle.textContent = '☰';

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(handle);

    todoList.appendChild(listItem);
  });

  const sortable = Sortable.create(todoList, {
    handle: '.drag-handle',
    animation: 150,
    onEnd: (event) => {
      const movedTask = tasks[event.oldIndex];
      tasks.splice(event.oldIndex, 1);
      tasks.splice(event.newIndex, 0, movedTask);
      renderTasks();
    },
  });
}

window.addEventListener('load', renderTasks);