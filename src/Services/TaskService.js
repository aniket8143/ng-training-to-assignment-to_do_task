// TaskService.js
const TaskService = {
    getTasks: () => {
      
        //get data from localstorage if data is exit then it give data or give null value;
        return Promise.resolve(JSON.parse(localStorage.getItem('tasks')) || []);
    },
    addTask: (task) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //add new task in local storage
        tasks.push(task);
        //update local storage;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return Promise.resolve(task);
    },
    updateTask: (updatedTask) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //index give as some positive value if task.id and updatedTask.id is equal
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        //code for updating task is index give some positive then updatedTask is add int privious task position.
        if (index !== -1) {
            tasks[index] = updatedTask;
            //update local storage;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        return Promise.resolve(updatedTask);
    },
    deleteTask: (taskId) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //remove task of that id
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        //update local storgae;
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return Promise.resolve(taskId);
    }
};

export default TaskService;
