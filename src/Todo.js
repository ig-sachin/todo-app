import { Button, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import './Todo.css'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))
function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
        }, { merge: true })
        setOpen(false);
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                className="modal"
            >
                <div className={classes.paper}>
                    <h1>Open</h1>
                    <div className="center"><input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} /></div>
                    <div className="center"><Button onClick={updateTodo}>Update Todo</Button>
                        <Button onClick={handleClose}>Close</Button></div>
                </div>
            </Modal>
            <List className="list">
                <ListItem>
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText className="ListItemText" primary={props.todo.todo} />
                </ListItem>
                <div className="editdelete">
                    <button className="edit" onClick={e => setOpen(true)} ><span id="edit">Edit</span></button>
                    <DeleteForeverIcon className="delete" onClick={event => db.collection('todos').doc(props.todo.id).delete()} id="deletee" />
                </div>
            </List>
        </>
    )
}

export default Todo
