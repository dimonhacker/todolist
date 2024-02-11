import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {Add, AddCircle} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem:(title:string)=>void
}
const AddItemForm = (props:AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    const [error, setError] = useState<string|null>(null)
    const addItem = ()=>{
        if(title.trim()!=='') {
            props.addItem(title.trim());
            setTitle('')

        }
        else{
            setError('Title is required');
        }
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event:React.KeyboardEvent<HTMLInputElement>)=>{
        setError('')
        if(event.key==="Enter"){addItem()}
    }
    return (
        <div>
            <TextField size={"small"} value={title} onKeyDown={onKeyPressHandler} onChange={onChangeHandler} className={error? 'error':''}/>
            <IconButton onClick={addItem}><AddCircle/></IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;