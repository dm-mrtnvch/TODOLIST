import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        props.onChange(title)
    }
    const activateViewMode = () => setEditMode(false)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
    ? <input value={props.title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}