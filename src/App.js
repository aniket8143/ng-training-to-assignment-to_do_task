// App.js
import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <div className="App container mt-5">
            <h1 className="text-center mb-4">To-Do List Application</h1>
            <TaskList />
        </div>
    );
};

export default App;
