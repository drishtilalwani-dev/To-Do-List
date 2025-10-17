import React, { useState } from "react";

function TodoForm({ addTask }){
    const [task, setTask] = useState(""); //creates a variable task that stores in the input box

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") return; //validation  -- prevents adding empty tasks
        addTask(task);
        setTask(""); //clear input after adding
    };

    return(
        //form submission
        <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              value={task}    //controlled input
              onChange={(e) => setTask(e.target.value)} //every time you type something it updates task in real-time
              placeholder="Enter a new task.."
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TodoForm;