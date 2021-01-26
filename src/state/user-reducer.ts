import React from 'react';

export type UserType = {
    name: string
    age: number
    childrenCount: number
}

export type ActionType = {
    type: string
    [key: string]: any
}

function incAge(user: UserType) {
    return {...user, age: user.age + 1}
}


function incCount(user: UserType) {
    return {...user, childrenCount: user.childrenCount + 1}
}

function changeName(user: UserType, newName: string) {
    return {...user, name: newName}
}

export function UserReducer(user: UserType, action: ActionType) {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...user, age: user.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...user, childrenCount: user.childrenCount + 1}
        case 'CHANGE-NAME':
            return {...user, name: action.newName}

    }
}
