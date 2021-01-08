import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'All' | 'Completed' | 'Active'


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('Active')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === 'Completed') {
        tasksForTodoList = tasks.filter( t => t.isDone);
    }
    if (filter === 'Active') {
        tasksForTodoList = tasks.filter( t => !t.isDone)
    }

    function addTask(title: string) {
        let newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false}
            setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}/>
        </div>
    );
}

export default App;


