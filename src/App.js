import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./TodoForm";

function App() {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ✏️ Edit task text
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div className="app">
      <div className="todo-card">
        <h1>📝 To-Do List</h1>
        <TodoForm addTask={addTask} />

        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </ul>

        {tasks.length > 0 && (
          <div className="summary-section">
            <p>Total tasks: {tasks.length}</p>
            <p>Completed: {tasks.filter((task) => task.completed).length}</p>
            <button className="clear-btn" onClick={() => setTasks([])}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskItem({ task, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="edit-input"
        />
      ) : (
        <span className={task.completed ? "completed" : ""}>
          {task.text}
        </span>
      )}

      <div>
        {/* ✏️ Edit button */}
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? "💾" : "✏️"}
        </button>

        {/* 🗑 Delete button */}
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          🗑
        </button>
      </div>
    </li>
  );
}

export default App;




