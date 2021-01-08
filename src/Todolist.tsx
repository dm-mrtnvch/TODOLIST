import React, {useState} from 'react';
import {FilterValuesType} from './App';

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (tasksId: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={(e) => {setTitle(e.currentTarget.value)}} />
            <button onClick={() => props.addTask(title)}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>x</button>
            </li>)}
        </ul>
        <div>
            <button onClick={() => {props.changeFilter('All')}}>All</button>
            <button onClick={() => {props.changeFilter('Active')}}>Active</button>
            <button onClick={() => {props.changeFilter('Completed')}}>Completed</button>
        </div>
    </div>
}