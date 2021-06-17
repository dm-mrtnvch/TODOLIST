import React, {useEffect, useState} from 'react';
import {todoListsAPI} from './todo-lists-api';



export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'title for new todolist'
        todoListsAPI.createTodoList(title)
            .then((res) => {
                setState(res.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '4053b1f4-0a33-46a5-ac4c-9542e2847f4d'
        const title = `HERE'S NEW TITLE FOR THE OLD TASK`
        todoListsAPI.updateTodoList(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '45bc4cc7-ffde-4607-bf5c-e7c3bbea5b41'
        todoListsAPI.deleteTodoList(todoListId)
            .then((res) => {
                setState(res.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4053b1f4-0a33-46a5-ac4c-9542e2847f4d'
        todoListsAPI.getTodoListTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}