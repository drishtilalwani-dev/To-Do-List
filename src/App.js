import React, { useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app">
      <div className="todo-card">
        <h1>📝To-Do List</h1>
        <TodoForm addTask={addTask} />

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <>
            <p>Total tasks: {tasks.length}</p>
            <p>Completed: {tasks.filter(task => task.completed).length}</p>
            <button className="clear-btn" onClick={() => setTasks([])}>
              Clear All
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;





