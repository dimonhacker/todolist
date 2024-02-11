import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import styled from "styled-components";

export type FilterType = "All" | "Active" | "Completed"
type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type FlexWrapperType = {
    isColumn: boolean
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListsType>>(
        [
            {id: todolistID1, title: "What to learn", filter: 'All'},
            {id: todolistID2, title: "What to buy", filter: 'All'}
        ]
    )

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Rest Api", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    })


    function changeFilter(val: FilterType, id: string) {
        let todoList = todolists.find(list => list.id === id)
        if (todoList) {
            todoList.filter = val
            setTodolists([...todolists])
        }
    }


    const addItem = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    const removeItemById = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks})
        console.log("remove " + id)
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (id: string, newTitle:string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }
    const changeHeaderTitle = (id: string, newTitle:string) => {
        let todoList = todolists.find(tl=>tl.id===id);
        if(todoList){
            todoList.title = newTitle
            setTodolists([...todolists])
        }

    }

    function removeToDoList(id: string) {
        setTodolists(todolists.filter(el => el.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        let newTodoList: TodoListsType = {
            id: newTodoListId, title: title, filter: "All"
        }
        setTodolists([newTodoList, ...todolists])
        setTasks({
            ...tasks, [newTodoListId]: []
        })
    }
    return (
        <div className="App">
                    <AddItemForm addItem={addTodoList}></AddItemForm>
                    {
                        todolists.map(
                            todolist => {
                                let allToDoListTasks = tasks[todolist.id]
                                let tasksForToDoList = allToDoListTasks
                                if (todolist.filter === "Active") {
                                    tasksForToDoList = allToDoListTasks.filter(t => !t.isDone)
                                } else if (todolist.filter === "Completed") {
                                    tasksForToDoList = allToDoListTasks.filter(t => t.isDone)
                                }
                                return <TodoList key={todolist.id} deleteTaskHandler={removeToDoList} id={todolist.id}
                                                 title={todolist.title}
                                                 tasks={tasksForToDoList} removeTask={removeItemById}
                                                 changeFilter={changeFilter}
                                                 addItem={addItem} changeTaskStatus={changeTaskStatus}
                                                 changeTitle={changeTaskTitle}
                                                 changeHeaderTitle={changeHeaderTitle}
                                                 filter={todolist.filter}/>
                            })
                    }
            {/*<TodoList title = "Songs" tasks = {tasks2}/>*/}
        </div>
    );
}

export const FlexWrapper = styled.div<FlexWrapperType>`
  display: flex;
  flex-direction: ${props => props.isColumn ? 'column' : 'row'};
  justify-content: start;
  align-items: center;
`
export default App;
