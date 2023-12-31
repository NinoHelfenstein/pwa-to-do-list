import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem("toDoStorage");
    return localData
      ? JSON.parse(localData)
      : localStorage.setItem("toDoStorage", "[]");
  });
  useEffect(() => {
    localStorage.setItem("toDoStorage", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const length = todos.filter((todo) => todo.done === false).length;
    if (length === 0) {
      document.title = "You got nothing to do, relax 🍃📚";
    } else {
      document.title = `${
        todos.filter((todo) => todo.done === false).length
      } open task${
        todos.filter((todo) => todo.done === false).length > 1 ? "" : "s"
      }`;
    }
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
      <ul className="OpenToDoList">
        {todos.filter((todo) => todo.done === false).length === 0 ? (
          <>
            <img
              className="gif"
              src="https://media.tenor.com/cNHU73CvqLUAAAAC/relax-chillin.gif"
              alt="https://tenor.com/de/view/relax-chillin-just-extra-gif-20242751"
            />
            <br />
            <a href="https://tenor.com/de/view/relax-chillin-just-extra-gif-20242751">
              Relax Chillin GIF
            </a>
            <p>"You got nothing to do, relax 🍃📚"</p>
          </>
        ) : (
          todos
            .filter((todo) => todo.done === false)
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <ToDoItem
                key={item.id}
                item={item}
                toggleDone={toggleDone}
                removeToDo={removeToDo}
              />
            ))
        )}
      </ul>
      <hr />
      <ul className="DoneToDoList">
        {todos
          .filter((todo) => todo.done === true)
          .sort((a, b) => b.id - a.id)
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
      <input type="submit" value="ADD" />
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
