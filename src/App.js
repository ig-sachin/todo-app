import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import db from './firebase';
import './appstyle.css'

const styles = {
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
}
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [maxValue, setMaxValue] = useState(100000);
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      // console.log("database", snapshot.docs.map(doc => doc.data().todo));
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, []);
  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: maxValue
    })
    setMaxValue(maxValue - 1);
    setInput('');
  }
  return (
    <div className="app">
      <h1>Add Your TODO</h1>
      <div>
        <form className="form">
          <FormControl>
            <InputLabel>
              ✅ Write a TODO</InputLabel>
            <Input value={input} onChange={event => setInput(event.target.value)} />
          </FormControl>
          <Button className="container" disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
            <span id="addtodo">ADD TODO</span>
          </Button>
        </form>
      </div>


      <div className="listitem">
        <ul className="todolist">
          {
            todos.map((todo) => <Todo todo={todo} />)
          }
        </ul>
      </div>
    </div>
  )
}

export default App

