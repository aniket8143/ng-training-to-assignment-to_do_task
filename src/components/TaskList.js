import React, { useState, useEffect } from 'react';
//Import your TaskForm
import TaskForm from './TaskForm';
//IMport your TaskService
import TaskService from '../Services/TaskService';
import Modal from 'react-modal';
// Import your styles here
import '../styles.css'; 

Modal.setAppElement('#root');

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nextId, setNextId] = useState(1);
    
    // Pagination state
    // Show only 5 tasks per page
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5; 

    useEffect(() => {
        TaskService.getTasks().then(data => {
            setTasks(data);
            if (data.length > 0) {
                setNextId(data[data.length - 1].id + 1);
            }
        });
    }, []);
    // Code for Handling Delete Task
    const handleDelete = (taskId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            TaskService.deleteTask(taskId).then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            });
        }
    };

    //Code for Handling Edit task
    const handleEdit = (task) => {
        setEditingTask(task);
        setModalIsOpen(true);
    };

    const handleFormSubmit = (task) => {
        //Code for Handling Task Update
        if (task.id) {
            TaskService.updateTask(task).then(() => {
                setTasks(prev => prev.map(t => (t.id === task.id ? task : t)));
            });
        }
        //Code for add New 
        else {
            const newTask = { ...task, id: nextId };
            TaskService.addTask(newTask).then(() => {
                setTasks(prev => [...prev, newTask]);
                setNextId(nextId + 1);
            });
        }
        setEditingTask(null);
        setModalIsOpen(false);
    };

    const filteredTasks = tasks.filter(task =>
        //filter task by user name;
        task.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <button onClick={() => { setEditingTask(null); setModalIsOpen(true); }}>
                    New Task
                </button>
               
            </div>
            <input
                className="search-input"
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.user_name}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.due_date}</td>
                            <td>{task.priority}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

               {/* Pagination Controls */}
            
            <div className="pagination">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Last</button>
            </div>

            {
            // This is code for open new pop box for add task and eidt task
            }

            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '400px',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
                <TaskForm task={editingTask} onSubmit={handleFormSubmit} />
                <button onClick={() => setModalIsOpen(false)} style={{ marginTop: '10px' }}>
                    Close
                </button>
            </Modal>
        </div>
    ); 
};

export default TaskList;
