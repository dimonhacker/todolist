import React from 'react';

type ButtonType = {
    name:string,
    callback:()=>void
}

const Button = (props:ButtonType) => {
    const onclickHandler=()=>{
        props.callback()
    }
    return (
        <button onClick={onclickHandler}>{props.name}</button>
    );
};

export default Button;