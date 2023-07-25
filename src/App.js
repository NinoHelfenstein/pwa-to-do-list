import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, todo: "Example Todo Nr 1", done: false },
    { id: 2, todo: "Example Todo Nr 2", done: false },
    { id: 3, todo: "Example Todo Nr 3", done: true },
  ]);

  useEffect(() => {
    document.title = `${todos.length} open task${todos.length > 1 ? "s" : ""}`;
  }, [todos]);

  const toggleDone = (todoId) => {
    // Find the todo by id
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };
  const removeToDo = (todoId) => {
    // Filter out the todo with the given id
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const addToDo = (newItem) => {
    const updatedTodos = [...todos];
    updatedTodos.push(newItem);
    setTodos(updatedTodos);
  };

  return (
    <>
      <Header />
      <Form addToDo={addToDo} />
      <ul className="ToDoList">
        {todos
          .sort((a, b) => a.done - b.done)
          .map((item) => (
            <ToDoItem
              key={item.id}
              item={item}
              toggleDone={toggleDone}
              removeToDo={removeToDo}
            />
          ))}
      </ul>
    </>
  );
}
function Header() {
  return <h1>To Do List</h1>;
}
function Form({ addToDo }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    const newItem = { id: Date.now(), todo: text, done: false };
    addToDo(newItem);
    setText("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
function ToDoItem({ item, toggleDone, removeToDo }) {
  return (
    <li className={item.done ? "done" : "open"}>
      <input
        type="checkbox"
        className="checkboxTemp"
        checked={item.done}
        onChange={() => toggleDone(item.id)}
      />
      <span className="toDoText">{item.todo}</span>
      <span className="removeToDo" onClick={() => removeToDo(item.id)}>
        ❌
      </span>
    </li>
  );
}
