import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

const changeTodolistTitleCallback = action('Title was changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan value={'start value'} onChange={changeTodolistTitleCallback}/>
}