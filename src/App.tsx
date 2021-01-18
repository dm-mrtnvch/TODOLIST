import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import set = Reflect.set;

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string] : TaskType[]
}

function App() {
    // BLL:

    const todoListID1 = v1()
    const todoListID2 = v1()

    const[todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "raz", isDone: true},
            {id: v1(), title: "dva", isDone: true},
            {id: v1(), title: "tri", isDone: true}
        ]
    });
    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTask(id: string, todoListID: string) {
        const todoListTasks = tasks[todoListID].filter(task => task.id !== id)
        tasks[todoListID] = todoListTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if(task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }


    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }




    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
