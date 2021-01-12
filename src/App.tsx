import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'All' | 'Completed' | 'Active'


function App() {
    // BLL:

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('Active')

    function addTask(title: string) {
        let newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    function changeStatus(taskID: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskID)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    let tasksForTodoList = tasks;
    if (filter === 'Completed') {
        tasksForTodoList = tasks.filter( t => t.isDone);
    }
    if (filter === 'Active') {
        tasksForTodoList = tasks.filter( t => !t.isDone)
    }



    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodoList}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}/>
        </div>
    );
}

export default App;


