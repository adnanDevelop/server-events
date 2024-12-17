import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: uuidv4(), task: "Learn Node.js" },
  { id: uuidv4(), task: "Build a To-Do App" },
];

let onlineUsers = []; 
let messages = [];

// Get all todos
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendUpdates = () => res.write(`data: ${JSON.stringify(todos)}\n\n`);

  sendUpdates();

  app.on("todoAdded", sendUpdates);

  req.on("close", () => {
    app.removeListener("todoAdded", sendUpdates);
  });
});

// Add a new todo
app.post("/add-todo", (req, res) => {
  const { task } = req.body;
  const newTodo = { id: uuidv4(), task };
  todos.push(newTodo);

  app.emit("todoAdded");

  res.status(201).json(newTodo);
});

// Delete Todo Endpoint
app.delete("/delete-todo/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(todoIndex, 1);
  app.emit("todoAdded");

  res.status(200).json({ message: "Todo deleted successfully" });
});

// Simulate a user going online or offline (for demo purposes)
app.post("/set-user-online", (req, res) => {
  const { userId, status } = req.body; // `status` can be "online" or "offline"

  if (status === "online") {
    if (!onlineUsers.includes(userId)) {
      onlineUsers.push(userId);
    }
  } else if (status === "offline") {
    onlineUsers = onlineUsers.filter((id) => id !== userId);
  }

  res.status(200).json({ userId, status });
});

// Endpoint to send a chat message
app.post("/send-message", (req, res) => {
  const { userId, message } = req.body;
  const newMessage = { id: uuidv4(), userId, message, timestamp: new Date() };

  messages.push(newMessage);

  app.emit("newMessage", newMessage);

  res.status(201).json(newMessage);
});

// Endpoint to get all previous chat messages
app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

// SSE endpoint for receiving messages in real-time
app.get("/chat-events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendMessages = () => {
    res.write(`data: ${JSON.stringify(messages)}\n\n`);
  };

  sendMessages();

  app.on("newMessage", sendMessages);

  req.on("close", () => {
    app.removeListener("newMessage", sendMessages);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
