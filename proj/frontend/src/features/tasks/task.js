import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask as deleteTaskFromSlice,
  selectTasks,
} from "./taskSlice";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from "./taskApiSlice";

const Task = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const { data: serverTasks, error, isLoading } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (serverTasks) {
      serverTasks.forEach((task) => {
        dispatch(addTask(task));
      });
    }
  }, [serverTasks, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createTask({
        title: task,
        description: description,
      }).unwrap();
      dispatch(
        addTask({
          title: result.title,
          description: result.description,
          id: result.id,
        }),
      );
      setTask("");
    } catch (err) {
      console.error("Failed to save the task: ", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id).unwrap();
      dispatch(deleteTaskFromSlice(id));
    } catch (err) {
      console.error("Failed to delete the task: ", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
        />

        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.description}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
