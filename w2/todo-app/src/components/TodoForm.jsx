import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task for today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">
        Add Task
      </button>
    </form>
  );
}
