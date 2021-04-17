import './App.css';
import { useState } from "react"
let id = 0

function App() {
  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([])
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    let addedTodo = { value: inputValue, id: id++, isDelete: false }
    console.log(addedTodo)
    let newTodos = todos.concat(addedTodo)
    setTodos(newTodos)
    setInputValue("")
  }
  const hadleRemoveTodo = (id) => {
    let filterTodo = todos.filter(todo => {
      if (todo.id === id) {
        todo.isDelete = !todo.isDelete
      }
      return todo
    })
    setTodos(filterTodo)
  }
  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text" name="" id="" value={inputValue} onChange={handleInputChange} />
      </form>
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id} onClick={() => {
              hadleRemoveTodo(todo.id)
            }}
              style={{ textDecoration: `${todo.isDelete === false ? "none" : "line-through"}` }}
            >
              {todo.value}
            </li>
          )
        })}
      </ul>
    </div >
  );
}

export default App;
