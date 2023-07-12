const toggle = (index, task) => {
  task.tasksArray.forEach((item) => {
    if (item.index === index) {
      item.completed = !item.completed;
    }
  });
  task.addTask();
};

const clearAll = (task) => {
  const completedTasks = task.tasksArray.filter((data) => data.completed === true);
  task.tasksArray = task.tasksArray.filter((item) => {
    return item.index !== completedTasks.map((data) => data.index);
  });
    completedTasks.forEach((task1) => {
    task1.index = undefined;
  });
  task.addTask();
};

export { toggle, clearAll };