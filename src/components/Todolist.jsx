import React, { useState } from 'react';
import {
  BiCheckDouble,
  BiEdit,
  BiTrash,
  BiCheckCircle,
  BiRefresh
} from 'react-icons/bi';

import './Todolist.css';

function Todolist() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // To track the todo being edited

  // Add or Update the task
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      if (editIndex !== -1) {
        // If editing an existing task, update the task
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = {
          task: inputValue,
          completed: updatedTodos[editIndex].completed
        };
        setTodos(updatedTodos);
        setInputValue('');
        setEditIndex(-1); // Reset edit mode
      } else {
        // If adding a new task, add it to the list
        setTodos([...todos, { task: inputValue, completed: false }]);
        setInputValue('');
      }
    }
  };

  // Start editing a task
  const startEdit = (index) => {
    setInputValue(todos[index].task); // Set input to current task
    setEditIndex(index); // Set index to the task being edited
  };

  // Cancel editing
  const cancelEdit = () => {
    setInputValue(''); // Clear input field
    setEditIndex(-1); // Reset edit index
  };

  // Toggle the completion state of a task
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Here are my To-Do Lists</h1>

      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new task"
          className="input-field"
        />

        {editIndex !== -1 ? (
          <>
            <button className="update-btn" onClick={addTodo}>
              <BiCheckDouble />
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>
              <BiRefresh />
            </button>
          </>
        ) : (
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        )}
      </div>

      <div className="todo-list">
        {todos.map((todo, index) => (
          <div key={index} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span
              className={`task-text ${todo.completed ? 'completed' : ''}`}
              onClick={() => startEdit(index)}
            >
              {todo.task}
            </span>
            <button className="edit-btn" onClick={() => startEdit(index)}>
              <BiEdit />
            </button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              <BiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todolist;
