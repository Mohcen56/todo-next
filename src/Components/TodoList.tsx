"use client";

import { Todo } from "@/Interfaces/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TodoList({ todos, onUpdate, onDelete, onToggle }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          No todos yet. Add one above!
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
