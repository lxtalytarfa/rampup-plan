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
          className="border w-full text-base px-2 py-1 mb-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          required
        />
        <input
          className="border w-full text-base px-2 py-1 mb-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
        />

        <button
          className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md"
          type="submit"
        >
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between border w-full text-base px-2 py-1 mt-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
          >
            <div>
              <p>{task.title}</p>
              <p>{task.description}</p>
            </div>
            <button
              className="border-2 border-indigo-700 bg-indigo-700 text-white px-2 w-16 rounded-md"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
