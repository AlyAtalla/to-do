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
  const filteredTasks = task.tasksArray.filter(item => item.index !== completedTasks.map(d => d.index));
  task.tasksArray = filteredTasks;
    completedTasks.forEach((task1) => {
    task1.index = undefined;
  });
  task.addTask();
};

export { toggle, clearAll };