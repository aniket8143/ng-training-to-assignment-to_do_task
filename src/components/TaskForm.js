import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit }) => {
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');

    useEffect(() => {
        //This code if task is non empty then it come her and changes the task and changes 
        if (task) {
            setUserName(task.user_name);
            setDescription(task.description);
            setStatus(task.status);
            setDueDate(task.due_date);
            setPriority(task.priority);
        }
        // if there is no taks then add new task
         else {
            setUserName('');
            setDescription('');
            setStatus('Pending');
            setDueDate('');
            setPriority('Medium');
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { user_name: userName, description, status, due_date: dueDate, priority };
        // if task is already exit then it update if not the add newTask 
        onSubmit(task ? { ...newTask, id: task.id } : newTask);
        //after submit the all test bax are empty of predefined values
        setUserName('');
        setDescription('');
        setStatus('Pending');
        setDueDate('');
        setPriority('Medium');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
           {/* User Name and Task Description is Required*/}
            <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="User Name" 
                required 
                style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Task Description"
                required
                style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginBottom: '10px', padding: '8px' }}>
                <option value="Not yet Started">Not yet Started</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
                style={{ marginBottom: '10px', padding: '8px' }}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ marginBottom: '10px', padding: '8px' }}>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
            </select>
            <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px' }}>
                {task ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
