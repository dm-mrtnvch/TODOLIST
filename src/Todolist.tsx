import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type PropsType = {
    title: string
    tasks: Array<TasksType>
    filter: FilterValuesType
    removeTask: (tasksId: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
        props.addTask(trimmedTitle)
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') addTask()
    }
    const onAllClickHandler = () => {props.changeFilter('All')}
    const onActiveClickHandler = () => {props.changeFilter('Active')}
    const onCompletedClickHandler = () => {props.changeFilter('Completed')}


    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {props.removeTask(taskObj.id)}
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked)
        }
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onPressHandler}
                className={error ? 'error' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {
                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <input
                        onChange={(e) => {
                            props.changeStatus(t.id, e.currentTarget.checked)}
                        }
                        type="checkbox"
                        checked={t.isDone}
                        />
                    <span>{t.title}</span>
                     <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button
                className={props.filter === 'All' ? 'active-filter' : ''}
                onClick={onAllClickHandler}
            >All</button>
            <button
                className={props.filter === 'Active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}
            >Active</button>
            <button
                className={props.filter === 'Completed' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}
            >Completed</button>
        </div>
    </div>
}