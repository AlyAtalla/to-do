import './style.css';
import Sortable from 'sortablejs';

const tasks = [
  { id: 1, description: 'Task 1', completed: false, index: 1 },
  { id: 2, description: 'Task 2', completed: true, index: 2 },
  { id: 3, description: 'Task 3', completed: false, index: 3 }
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

    const taskName = document.createElement('span');
    taskName.classList.add('todo-item__name');
    taskName.textContent = task.description;

    const optionsBtn = document.createElement('button');
    optionsBtn.classList.add('todo-item__options-btn');
    optionsBtn.innerHTML = '&#8942;';
    optionsBtn.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent checkbox click event from firing
      taskName.contentEditable = true;
      taskName.focus();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskName);
    listItem.appendChild(optionsBtn);

    todoList.appendChild(listItem);
  });

  const sortable = Sortable.create(todoList, {
    handle: '.todo-item__options-btn',
    animation: 150,
    onEnd: (event) => {
      const movedTask = tasks[event.oldIndex];
      tasks.splice(event.oldIndex, 1);
      tasks.splice(event.newIndex, 0, movedTask);
    },
  });
}

window.addEventListener('load', renderTasks);