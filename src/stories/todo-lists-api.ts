import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'c98c9e82-e0dc-426a-8e82-48270217e499'
    }
})

type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type TodoListResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: string
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksType = {
    totalCount: number
    error: string
    items: TaskType
}

export const todoListsAPI = {
    getTodoLists(){
        return instance.get<TodoListType>('todo-lists')
    },
    createTodoList(title: string){
        return instance.post<TodoListResponseType<{item: TodoListType}>>(`todo-lists`, {title})
    },
    updateTodoList(todolistId: string, title: string){
        return instance.put<TodoListResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodoList(todolistId: string){
        return instance.delete<TodoListResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    getTodoListTasks(todolistId: string){
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    }

}