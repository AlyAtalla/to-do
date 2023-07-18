import {
  displayTasks,
  inputEvents,
  removeTask,
} from 'C:/Users/ANDALOS/Documents/GitHub/to-do-list/src/modules/functionality';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('displayTasks function', () => {
  test('should display tasks correctly', () => {
    // Mock DOM
    document.body.innerHTML = '<ul class="nav__items"></ul>';
    const listContainer = document.querySelector('.nav__items');

    const tasks = [
      { index: 0, description: 'Task 1', completed: false },
      { index: 1, description: 'Task 2', completed: true },
    ];

    displayTasks(tasks, listContainer);

    // Check if the tasks are displayed correctly in the DOM
    const listItemElements = document.querySelectorAll('li');
    expect(listItemElements).toHaveLength(2);
    expect(listItemElements[0].querySelector('input[type="text"]').value).toBe('Task 2');
    expect(listItemElements[1].querySelector('input[type="text"]').value).toBe('Task 1');
  });
});

describe('inputEvents function', () => {
  test('should handle focusin and focusout events correctly', () => {
    // Mock DOM
    document.body.innerHTML = `
      <ul class="nav__items">
        <li>
          <div class="list__item">
            <input type="text" id="0" value="Task 1">
            <button type="button" class="btn">
              <i class="icon icon--dots"></i>
              <i class="icon icon--trash hidden"></i>
            </button>
          </div>
        </li>
      </ul>`;
    const listContainer = document.querySelector('.nav__items');

    const tasks = [{ index: 0, description: 'Task 1', completed: false }];
    const addTask = jest.fn();
    const render = jest.fn();

    inputEvents(tasks, addTask, listContainer, render);

    // Simulate focusin event
    const inputElement = document.querySelector('input[type="text"]');
    inputElement.dispatchEvent(new Event('focusin'));

    // Check if the class "active" is added correctly
    expect(inputElement.classList.contains('active')).toBe(true);

    // Simulate focusout event
    inputElement.value = 'Updated Task 1';
    inputElement.dispatchEvent(new Event('focusout'));

    // Check if the editTasks function is called with the correct arguments
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask).toHaveBeenCalledWith();
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledWith();
  });
});

describe('removeTask function', () => {
  test('should remove task from tasksArray and update localStorage', () => {
    const tasks = [
      { index: 0, description: 'Task 1', completed: false },
      { index: 1, description: 'Task 2', completed: true },
    ];
    const addTask = jest.fn();

    removeTask(tasks, addTask, '0');

    // Check if the task is removed correctly
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Task 2');

    // Check if the updated tasksArray is saved to localStorage
    expect(localStorage.getItem('todos')).toBe(JSON.stringify(tasks));
  });
});