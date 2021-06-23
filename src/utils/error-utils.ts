import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from '../app/app-reducer';
import {Dispatch} from 'react';
import {ResponseType} from '../api/todolists-api'



export const handleServerNetworkError = (dispatch: Dispatch<ServerErrorActionsType>, message: string) => {
    dispatch(setErrorAC(message))
    dispatch(setStatusAC('failed'))
}

export const handleServerAppError = (dispatch: Dispatch<ServerErrorActionsType>, res: any ) => {

        if (res.data.messages.length) {
            dispatch(setErrorAC(res.data.messages[0]))
        } else {
            dispatch(setErrorAC('some error in todolist'))
        }
    }


type ServerErrorActionsType = SetErrorActionType | SetStatusActionType