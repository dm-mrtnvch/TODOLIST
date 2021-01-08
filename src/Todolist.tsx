import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
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

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') addTask()
    }

    const onAllClickHandler = () => {props.changeFilter('All')}
    const onActiveClickHandler = () => {props.changeFilter('Active')}
    const onCompletedClickHandler = () => {props.changeFilter('Completed')}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onPressHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}