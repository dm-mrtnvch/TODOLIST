import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


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
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }







    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(task => task.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(task => task.isDone === true);
                    }
                    return (
                        <Todolist  id={tl.id}
                                   title={tl.title}
                                   tasks={tasks[tl.id]}
                                   filter={tl.filter}
                                   removeTask={removeTask}
                                   changeFilter={changeFilter}
                                   addTask={addTask}
                                   changeTaskStatus={changeStatus}
                                   removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
