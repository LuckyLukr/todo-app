import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css';

import Task from "./components/TaskComponent";
import Form from "./components/Form";
import FilterButtons from "./components/FilterButtons";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskFilter, setTaskFilter] = useState('all');

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(res => {
                const data = res.data;
                let singleTask = {
                    id: '',
                    name: '',
                    completed: false,
                    askForDelete: false
                }
                const allTasks = [];
                    
                    for (let i = 0; i < data.length; i++){
                        singleTask = {
                            id: data[i]._id,
                            name: data[i].name,
                            completed: data[i].completed,
                            askForDelete: false
                        }
                    allTasks.push(singleTask);
                    }
                setTasks([...tasks, ...allTasks]);
            })
            .catch(err => console.log(err));
    }, []);
    
    const addTask = name => {
        const newTask = { id: tasks.length + 1 , name, completed: false, askForDelete: false };
        axios.post('http://localhost:5000/', newTask);
        setTasks([...tasks, newTask]);
    }

    const handleComplete = taskId => {
        const newTasks = [...tasks];
        newTasks.forEach(e => taskId === e.id ? e.completed = !e.completed : '');
        setTasks(newTasks);
        const updateTask = newTasks.filter(e => taskId === e.id);
        axios.post('http://localhost:5000/' + taskId, ...updateTask);
    }

    const handleAskForDelete = taskId => {
        const newTasks = [...tasks];
        newTasks.forEach(e => taskId === e.id ? e.askForDelete = !e.askForDelete : '');
        setTasks(newTasks);
    }

    const handleDelete = taskId => {
        axios.delete('http://localhost:5000/' + taskId)
        const newTasks = [...tasks];
        const index = newTasks.findIndex(e => e.id === taskId);
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
    
    const handleEdit = taskId => {
        const newTask = [...tasks];
        const newText = prompt('Edit');
        newTask.forEach(e => taskId === e.id && newText.length > 0 ?  e.name = newText : alert('Type something...'));
        setTasks(newTask);
        axios.post('http://localhost:5000/' + taskId, ...newTask);
        }
    const handleCompletedTasks = () => setTaskFilter('completed');

    const handleAllTasks = () => setTaskFilter('all');

    const handleInompletedTasks = () => setTaskFilter('incompleted');

    const getFilteredTasks = () => {
        switch (taskFilter) {
            case 'completed':
                return tasks.filter(e => e.completed);
            case 'incompleted':
                return tasks.filter(e => !e.completed);
            default:
                return tasks;
        }
    }

    const tasksNumber = getFilteredTasks().length;
    
    const taskList = getFilteredTasks().map( task =>
         <Task 
             id={task.id}
             name={task.name}
             completed={task.completed}
             askForDelete={task.askForDelete}
             key={task.id} 
             onCompleted={handleComplete}
             onDeleted={handleDelete}
             onEdit={handleEdit}
             onAskForDelete={handleAskForDelete}
         />);

    return (
    <div className='app'>
        <div className='header '>
            <Form addTask={addTask} />
            <FilterButtons
                  tasksNumber={tasksNumber}
                  onShowCompleted={handleCompletedTasks}
                  onShowAll={handleAllTasks}
                  onShowIncompleted={handleInompletedTasks}
            />
        </div>
    
        <div className="todoListContainer">
            <ul className="todoList" >
             {taskList}
            </ul>
        </div>
    </div>
    );
};

export default App;