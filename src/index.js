const tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 }
];

function renderTasks() {
  const todoList = document.getElementById('todo-list');

  tasks.sort((a, b) => a.index - b.index); // Sort tasks based on index

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = task.description;
    if (task.completed) {
      listItem.style.textDecoration = 'line-through';
    }
    todoList.appendChild(listItem);
  });
}

window.addEventListener('load', renderTasks);