import React from 'react';
import Button from "./components/Button";

type NewComponentType = {
    students: Array<StudentType>
}
type StudentType = {
    manufacturer: string,
    model: string

}
const Test = (props: NewComponentType) => {

    function Button1Foo(name:string, age:number) {
        console.log(name, age)
    }
    function Button2Foo() {
        console.log("I'm stupid button")
    }

    return (
        <div className={"TestDiv"}>
            {/*<button onClick={(event) => {alert("hello")}}>MyYoutubeChannel-1</button>*/}
            {/*<button onClick={(event) => {onclickHandler("Vasya")}}>MyYoutubeChannel-1</button>*/}
            {/*<button onClick={(event) => {onclickHandler("Ivan")}}>MyYoutubeChannel-2</button>*/}
            <Button name={"MyYoutubeChannel-1"} callback={()=>Button1Foo("Vasya", 21)}/>
            <Button name={"MyYoutubeChannel-2"} callback={()=>Button1Foo("Ivan", 22)}/>
            <Button name={"StupidButton"} callback={Button2Foo}/>
        </div>
    );
};


export default Test;