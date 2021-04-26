import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type ActionType = RemoveTodolistAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeFilterType

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListID: string
    title: string
}

export type ChangeFilterType = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListID: string
    value: FilterValuesType
}

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return todoLists.filter(tl => tl.id != action.todoListID)
        }
        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodolist: TodoListType  = {id: newTodolistId, title: action.title, filter: 'all'};
            return [...todoLists, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl);
        }
        default:
            return todoLists
    }
}



export const RemoveTodoListAC = (todoListID: string): RemoveTodolistAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    }
}