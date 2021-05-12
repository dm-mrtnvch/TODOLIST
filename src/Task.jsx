import React, {ChangeEvent, useState} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from '../Todolist';

type TaskPropsType = {
    task: TaskType
    onChangeHandler: () => void
        onTitleChangeHandler: () => void
    onClickHandler: () => void
}

export const Task = React.memo((
    {
        task,
        onClickHandler,
        onChangeHandler,
        onTitleChangeHandler
    }: TaskPropsType) => {
    console.log('Task')



    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})