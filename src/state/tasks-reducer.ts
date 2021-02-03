import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {stringify} from 'querystring';
import {TaskType} from '../Todolist';
import {act} from 'react-dom/test-utils';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskActionType = {
    type: 'CHANGE-TASK'
    taskId: string
    isDone: boolean
    todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK': {
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]]
                    .map(task => {
                        if(task.id !== action.taskId) {
                            return
                        } else {
                            return {...task, isDone, }
                        }
                    })
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTasksAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const SecondAc = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskActionType => {
    return { type: 'CHANGE-TASK', taskId, isDone, todolistId}
}


