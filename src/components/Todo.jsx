import React, { useEffect, useRef, useState, useContext } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from "./TodoItems";
import { ThemeContext } from '../context/ThemeContext';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const inputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://todo-list-web-app-roan.vercel.app');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodoList(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const newTodo = await response.json();
      setTodoList(prev => [...prev, newTodo]);
      inputRef.current.value = "";
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodoList(prev => prev.filter(todo => todo._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const toggle = async (id) => {
    try {
      const todo = todoList.find(t => t._id === id);
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isComplete: !todo.isComplete,
          text: todo.text
        }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodoList(prev => prev.map(t => t._id === id ? updatedTodo : t));
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTodo = async (id, newText) => {
    try {
      const todo = todoList.find(t => t._id === id);
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newText,
          isComplete: todo.isComplete
        }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodoList(prev => prev.map(t => t._id === id ? updatedTodo : t));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-[var(--text-color)] text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-[var(--card-bg)] place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg transition-colors duration-300">
      <div className="flex items-center mt-7 justify-between">
        <div className="flex items-center gap-2">
          <img className="w-8" src={todo_icon} alt="" />
          <h1 className="text-3xl font-semibold text-[var(--text-color)]">To-Do List</h1>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-[var(--border-color)] transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? 
            <FaSun className="text-yellow-500 text-xl" /> : 
            <FaMoon className="text-slate-700 text-xl" />
          }
        </button>
      </div>

      <div className="flex items-center my-7 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-10 pl-6 pr-2 text-[var(--text-color)]"
          type="text"
          placeholder='Add your task'
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button
          onClick={add}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-medium rounded-full px-3 py-1"
        >
          Add
        </button>
      </div>

      
<div className="flex-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-[var(--border-color)]">
  {todoList.map((item) => (
    <TodoItems
      key={item._id}
      {...item}
      id={item._id}
      deleteTodo={deleteTodo}
      toggle={toggle}
      updateTodo={updateTodo}
    />
  ))}
</div>

    </div>
  );
};

export default Todo;
