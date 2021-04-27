import {FilterValuesType, TasksStateType, TodoListType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../Todolist';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string

}

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(t => t.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            let stateCopy = {...state}
            stateCopy[action.todoListId] = [newTask, ...state[action.todoListId]]
            return stateCopy
            // более правильный подход:
            // let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            // return {
            //     ...state,
            //     [action.todoListId]: [newTask, ...state[action.todoListId]]
            // }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    return task.id === action.taskId ? {...task, title: action.title} : task
                    // if(task.id === action.taskId){
                    //     return  {
                    //         ...task, title: action.title}
                    // } else {
                    //     return task
                    // }
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK', taskId, todoListId
    }
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK', title, todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE', taskId, title, todolistId
    }
}