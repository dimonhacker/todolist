import React, {ChangeEvent} from 'react';
import {FilterType, FlexWrapper} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, MenuItem} from "@mui/material";
import {AddCircle, Delete} from "@mui/icons-material";

type TodoPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (val: FilterType, id: string) => void
    addItem: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTitle: (id: string, newTitle: string, todoListId: string) => void
    changeHeaderTitle: (todolistId: string, newTitle: string) => void
    filter: FilterType
    deleteTaskHandler: (todolistId: string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;

}
export const TodoList = (props: TodoPropsType) => {
    function deleteTaskHandler() {
        props.deleteTaskHandler(props.id)
    }

    function buttonClickHandler(id: string) {
        props.removeTask(id, props.id)
    }

    const addTask = (title: string) => {
        props.addItem(title, props.id)
    }
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const style = {
        marginRight: '5px'
    }
    const changeHeaderTitle = (newTitle: string) => {
        props.changeHeaderTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeHeaderTitle}/>
                <IconButton onClick={deleteTaskHandler}><Delete/></IconButton>
                <AddItemForm addItem={addTask}/>
            </h3>
            <List ref={listRef}>
                {props.tasks.map(task => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }
                    const onTitleHandler = (newTitle: string) => {
                        props.changeTitle(task.id, newTitle, props.id)
                    }
                    return (
                        <ListItem className={task.isDone ? 'is-done' : ''} key={task.id}>
                            <FlexWrapper isColumn={false}>
                                <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                                <EditableSpan title={task.title}
                                              onChange={onTitleHandler}/>
                                <IconButton size={"small"}
                                            onClick={() => buttonClickHandler(task.id)}><Delete/></IconButton>
                            </FlexWrapper>
                        </ListItem>
                    )
                })}
            </List>
            <div>
                <Button sx={style} variant={props.filter === "All" ? 'contained' : 'outlined'}  size={"small"}
                        onClick={() => props.changeFilter("All", props.id)}
                        className={props.filter === "All" ? 'active-filter' : ''}>All</Button>
                <Button sx={style} variant={props.filter === "Active" ? 'contained' : 'outlined'} size={"small"}
                        onClick={() => props.changeFilter("Active", props.id)}
                        color={"primary"}
                        className={props.filter === "Active" ? 'active-filter' : ''}>Active</Button>
                <Button sx={style} variant={props.filter === "Completed" ? 'contained' : 'outlined'} size={"small"}
                        onClick={() => props.changeFilter("Completed", props.id)}
                        color={"secondary"}
                        className={props.filter === "Completed" ? 'active-filter' : ''}>Completed</Button>
            </div>
        </div>
    );
}

