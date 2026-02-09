"use client";

import { useState } from "react";
import { Todo } from "@/Interfaces/Todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete, onToggle }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle.trim() !== todo.title) {
      onUpdate(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center gap-3 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Edit todo title"
          className="flex-1 px-3 py-1 rounded border border-blue-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 text-zinc-800 dark:text-zinc-200 cursor-pointer ${
            todo.completed ? "line-through text-zinc-400 dark:text-zinc-500" : ""
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
}
