"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/Interfaces/Todo";
import TodoForm from "@/Components/TodoForm";
import TodoList from "@/Components/TodoList";

const STORAGE_KEY = "todos";

function loadTodosFromStorage(): Todo[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((todo: Todo) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (e) {
    console.error("Failed to parse stored todos:", e);
    return [];
  }
}

function saveTodosToStorage(todos: Todo[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = loadTodosFromStorage();
    setTodos(stored);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveTodosToStorage(todos);
    }
  }, [todos, isInitialized]);

  return { todos, setTodos, isInitialized };
}

export default function Home() {
  const { todos, setTodos, isInitialized } = useTodos();

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, title: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
            Todos
          </h1>
        </header>

        {totalCount > 0 && (
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                {totalCount}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedCount}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalCount - completedCount}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Remaining</div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700/50 mb-6">
          <TodoForm onAdd={addTodo} />
        </div>

        <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700/50">
          {!isInitialized ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          <p>Double-click on a todo to edit it</p>
        </footer>
      </main>
    </div>
  );
}
