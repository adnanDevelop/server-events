import { useEffect, useState } from "react";

const ServerEvent = () => {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("user123"); // Simulated user ID
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/events");

    eventSource.onmessage = (event) => {
      const newTodos = JSON.parse(event.data);
      setTodos(newTodos);
    };

    eventSource.onerror = (error) => {
      console.error("Error in SSE:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const addTodo = async (task: string) => {
    await fetch("http://localhost:5000/add-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
  };

  const deleteTodo = async (id: string) => {
    await fetch(`http://localhost:5000/delete-todo/${id}`, {
      method: "DELETE",
    });
  };

  const checkUserOnline = async () => {
    const response = await fetch(
      `http://localhost:5000/check-user-online/${userId}`
    );
    const data = await response.json();
    setIsOnline(data.online);
  };

  const setUserOnlineStatus = async (status: "online" | "offline") => {
    await fetch("http://localhost:5000/set-user-online", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        status,
      }),
    });
    setUserId(userId); // Ensure user status is updated
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos?.map((todo: { id: string; task: string }) => (
          <li key={todo.id}>
            {todo.task}{" "}
            <button type="button" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo("New Todo")}>Add Todo</button>

      <div>
        <h2>User Online Status</h2>
        <p>{isOnline ? "User is online" : "User is offline"}</p>
        <button onClick={checkUserOnline}>Check User Online</button>
        <button onClick={() => setUserOnlineStatus("online")}>
          Set User Online
        </button>
        <button onClick={() => setUserOnlineStatus("offline")}>
          Set User Offline
        </button>
      </div>
    </div>
  );
};

export default ServerEvent;
