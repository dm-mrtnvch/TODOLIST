import {FilterValuesType, TodolistType} from '../App';
import {act} from 'react-dom/test-utils';
import {ActionType} from './user-reducer';
import {v1} from 'uuid';


type RemoveTodoListActionType = {
    type: string
    id: string
}

type AddTodoListActionType = {
    type: string
    title: string
}

type ChangeTodoListTitleActionType = {
    type: string
    id: string
    title: string
}

type ChangeTodoListFilterActionType = {
    type: string
    id: string
    filter: FilterValuesType
}


export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export function todoListsReducer(state: Array<TodolistType>, action: ActionType) {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, {}]
        case 'CHANGE-TODOLIST-TITLE':
            const todoLists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
            return todoLists
        case 'CHANGE-TODOLIST-FILTER': {
            const todoLists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.filter}
                }
                return tl
            })
            return todoLists
        }
        default:
            return state
    }
}