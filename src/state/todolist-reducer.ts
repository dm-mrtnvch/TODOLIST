import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodoListTitleActonType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

type ChangeTodoListFilterActonType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActonType | ChangeTodoListFilterActonType


export function todoListsReducer(state: Array<TodolistType>, action: ActionType) {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            // const todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     todolist.title = action.title;
            const todolists = state.map(tl => {
                if(tl.id === action.id){
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
            return todolists
        // return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state]
            }
            return state
        default:
            return state
    }

}