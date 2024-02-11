import React, {useState} from 'react';
import Button from "./components/Button";

const State = () => {
    let [a,setA] = useState(1)
    const onClickHandler = ()=>{
        setA(++a);
    }
    const onClickHandlerClear = ()=>{
        setA(0)
    }
    return (
        <div>
            <h1>{a}</h1>
            <Button name={"click"} callback={onClickHandler}></Button>
            <Button name={"clear"} callback={onClickHandlerClear}></Button>
        </div>
    );
};

export default State;