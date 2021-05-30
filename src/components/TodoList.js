import { useEffect, useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(null);
  const sampleTodos = [
    { title: 'Buy groceries', isCompleted: false },
    { title: 'Water the plants', isCompleted: false },
    { title: 'Complete Homework', isCompleted: false },
  ];

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getTodos = () => {
    const newTodos = JSON.parse(localStorage.getItem('todos'));
    if (newTodos && newTodos.length > 0) {
      setTodos(newTodos);
    } else {
      setTodos(sampleTodos);
    }
  };

  useEffect(() => {
    if (todos.length === 0) {
      getTodos();
    }
    saveTodos();
  }, [todos]);

  const getTodosToRender = () => {
    return todos.map((todo, idx) => {
      return (
        <div className="columns todo mt-3 is-vcentered">
          <div className="column has-text-left">
            <div
              key={idx}
              className={todo.isCompleted ? 'completed' : 'incomplete'}
            >
              {todo.title}
            </div>
          </div>
          <div className="column is-narrow">
            <div className="buttons">
              {!todo.isCompleted ? (
                <button
                  className="button is-success"
                  onClick={() => handleCompleteTask(idx)}
                >
                  Complete
                </button>
              ) : null}

              <button
                className="button is-danger"
                onClick={() => handleDeleteTask(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleDeleteTask = (idx) => {
    const newTodos = [...todos];
    newTodos.splice(idx, 1);
    setTodos(newTodos);
  };

  const handleCompleteTask = (idx) => {
    const newTodos = [...todos];
    newTodos[idx].isCompleted = true;
    setTodos(newTodos);
  };

  const handleInputChanged = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddNewTodo = () => {
    const newTodoList = [...todos];
    newTodoList.push({ title: newTodo, isCompleted: false });
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
