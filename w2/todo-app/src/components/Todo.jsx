import React from "react";

export default function Todo({ task, deleteTodo }) {

  return (
    <div className="Todo">
      <p>{task.task}</p>
      <button onClick={() => deleteTodo(task)}>Delete</button>
    </div>
  );
}
