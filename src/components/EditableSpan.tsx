import React, {useState} from 'react';
import {TextField, Typography} from "@mui/material";

type PropsType = {
    title: string
    onChange: (newTitle:string)=>void
}
const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")
    const enableEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const disableEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    return (
        editMode ?
            <TextField onBlur={disableEditMode} onChange={(e) => setTitle(e.currentTarget.value)} autoFocus
                       value={title}/> :
                <span onDoubleClick={enableEditMode}>{props.title}</span>
    );
};

export default EditableSpan;