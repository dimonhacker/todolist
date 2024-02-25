import React from 'react';
import {Button} from "@mui/material";

type ButtonType = {
    name:string,
    callback:()=>void
}

const ButtonComponent = (props:ButtonType) => {
    const onclickHandler=()=>{
        props.callback()
    }
    return (
        <Button onClick={onclickHandler}>{props.name}</Button>
    );
};

export default ButtonComponent;