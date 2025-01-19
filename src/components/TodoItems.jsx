import React, { useState } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (editedText.trim() !== "") {
      updateTodo(id, editedText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedText(text);
    }
  };

  return (
    <div className="bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4 mb-4">
      <div className="flex items-center gap-4">
        <img 
          src={isComplete ? tick : not_tick} 
          alt="" 
          className="w-7 cursor-pointer flex-shrink-0"
          onClick={() => !isEditing && toggle(id)}
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleSubmit}
              onKeyDown={handleKeyDown}
              className="w-full p-2 bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded outline-none text-[17px]"
              autoFocus
            />
          ) : (
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer"
            >
              <p className={`text-[var(--text-color)] text-[17px] break-words
                ${isComplete ? "line-through opacity-60" : ""}
                ${isExpanded ? "" : "line-clamp-2"}`}
                title={text}
              >
                {text}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md transition-all duration-300 hover:shadow-lg"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => deleteTodo(id)}
            className="p-2 hover:bg-[var(--border-color)] rounded-full transition-colors"
          >
            <img
              src={delete_icon}
              alt="Delete"
              className="w-3.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItems;
