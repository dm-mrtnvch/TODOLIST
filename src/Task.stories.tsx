import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status was changed')
const changeTaskTitleCallback = action('Title was changed')
const removeTaskCallback = action('Task was removed')


export const TaskBaseExample = () => {
    return (
        <>
            <Task task={{id: '1', title: 'CSS', isDone: true}}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  removeTask={removeTaskCallback}
                  todolistId={'todolistId1'}
            />
            <Task task={{id: '2', title: 'JS', isDone: false}}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  removeTask={removeTaskCallback}
                  todolistId={'todolistId2'}
            />
        </>
    )
}