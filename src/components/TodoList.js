import { useState } from 'react';
export default function TodoList() {
  const [todos, setTodos] = useState([
    { title: 'Buy groceries' },
    { title: 'Water the plants' },
    { title: 'Complete Homework' },
  ]);
  const [newTodo, setNewTodo] = useState(null);

  const getTodosToRender = () => {
    return todos.map((todo, idx) => {
      return (
        <div className="columns todo mt-3 is-vcentered">
          <div className="column has-text-left">
            <div key={idx}>{todo.title}</div>
          </div>
          <div className="column is-narrow">
            <div className="buttons">
              <button className="button is-success">Complete</button>
              <button className="button is-danger">Delete</button>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleInputChanged = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddNewTodo = () => {
    const newTodoList = [...todos];
    newTodoList.push({ title: newTodo });
    setTodos(newTodoList);
  };

  return (
    <div>
      <input
        className="input is-primary"
        type="text"
        placeholder="Add a new task"
        onChange={handleInputChanged}
      />
      <button
        className="button is-link mt-3 is-fullwidth"
        onClick={handleAddNewTodo}
      >
        Add Todo
      </button>
      <hr />
      <div className="todoList">{getTodosToRender()}</div>
    </div>
  );
}
