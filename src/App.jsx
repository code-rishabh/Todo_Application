import { useState, useEffect } from "react";
import { TodoContextProvider } from "./Contexts/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import Logo from "./Components/Logo";

function App() {
  const [todos, setTodos] = useState([]);

  // defining all the methods we declared in the context file
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((eachTodo) => eachTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((eachTodo) =>
        eachTodo.id === id
          ? { ...eachTodo, completed: !eachTodo.completed }
          : eachTodo
      )
    );
  };

  // getting the previously saved todo list at the first load of the website from local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // setting the todos in the local storage once the user adds new todo to the list
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-zinc-800 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-2xl shadow-black/50 rounded-lg px-4 py-3 text-zinc-300">
          <Logo />

          <h1 className="text-3xl font-black text-center mb-8 mt-2">
            Manage Your TODOs
          </h1>
          <div className="mb-4">
            <TodoForm />
            {/* Todo form goes here */}
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
