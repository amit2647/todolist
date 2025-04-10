import express from "express";
import "dotenv/config";
import clientPromise from "../src/utils/mongo.js";

const app = express();
app.use(express.json());

// Custom handler function to manage routes
async function handler(req, res) {

  try {
    // Handle POST request to add a task
    if (req.method === "POST" && req.url === "/api/tasks/add") {
      const client = await clientPromise;
      const db = client.db("todolist");
      const tasks = db.collection("tasks");

      const task = req.body;

      // Validate incoming task data
      if (!task || !task.id || !task.title || !task.userId) {
        return res
          .status(400)
          .json({ error: "Invalid task format or missing userId" });
      }

      // Insert task into the database
      await tasks.insertOne(task);
      return res.status(201).json({ message: "Task added successfully" });
    }

    // Handle GET request to fetch all tasks
    else if (req.method === "GET" && req.url === "/api/tasks") {
      const client = await clientPromise;
      const db = client.db("todolist");
      const tasks = db.collection("tasks");

      const allTasks = await tasks.find().toArray();
      return res.status(200).json(allTasks);
    }

    // Handle GET request to fetch a single task by ID
    else if (req.method === "GET" && req.url.startsWith("/api/tasks/")) {
      const { id } = req.params;
      const client = await clientPromise;
      const db = client.db("todolist");
      const tasks = db.collection("tasks");

      const task = await tasks.findOne({ id });

      if (task) {
        return res.status(200).json(task);
      } else {
        return res.status(404).json({ error: "Task not found" });
      }
    }

    // Handle PUT request to update a task
    else if (req.method === "PUT" && req.url === "/api/tasks/update") {
      const updatedTask = { ...req.body };
      delete updatedTask._id;

      const client = await clientPromise;
      const db = client.db("todolist");
      const tasks = db.collection("tasks");

      const result = await tasks.updateOne(
        { id: updatedTask.id },
        { $set: updatedTask }
      );

      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .json({ error: "Task not found or already updated" });
      }

      return res.status(200).json({ message: "Task updated successfully" });
    }

    // Handle DELETE request to remove a task
    else if (
      req.method === "DELETE" &&
      req.url.startsWith("/api/tasks/delete/")
    ) {
      const { id } = req.params;
      const client = await clientPromise;
      const db = client.db("todolist");
      const tasks = db.collection("tasks");

      const result = await tasks.deleteOne({ id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted successfully" });
    }

    // Handle POST request to reset all tasks
    else if (req.method === "POST" && req.url === "/api/tasks/reset") {
      const client = await clientPromise;
      const db = client.db("todolist");
      const tasks = db.collection("tasks");

      await tasks.deleteMany({});
      return res
        .status(200)
        .json({ message: "All tasks cleared successfully" });
    }

    // Route not found
    else {
      return res.status(404).json({ error: "Route not found" });
    }
  } catch (error) {
    console.error("Error in request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

}

// Assigning the arrow function to a variable before exporting
const handlerFunction = async (req, res) => {
  return handler(req, res);
};

// Export the handler function
export default handlerFunction;
