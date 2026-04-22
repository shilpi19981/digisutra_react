import React, { useState, useEffect } from "react";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (data) setTasks(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ADD / UPDATE
  const handleAdd = () => {
    if (!title.trim()) return;

    if (editId !== null) {
      setTasks(
        tasks.map((t) =>
          t.id === editId
            ? { ...t, title, description, status }
            : t
        )
      );
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title,
          description,
          status,
        },
      ]);
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  // DELETE
  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // EDIT
  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditId(task.id);
  };

  // STATUS UPDATE
  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#e6f9f0",
      padding: "20px",
      fontFamily: "Arial",
    },
    inner: {
      maxWidth: "900px",
      margin: "auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#0f5132",
    },
    input: {
      padding: "10px",
      margin: "5px",
      borderRadius: "6px",
      border: "1px solid #bcd0c7",
      width: "100%",
    },
    textarea: {
      padding: "10px",
      margin: "5px",
      borderRadius: "6px",
      border: "1px solid #bcd0c7",
      width: "100%",
      minHeight: "60px",
    },
    button: {
      padding: "10px 15px",
      background: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
      margin: "5px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      borderRadius: "12px",
      background: "#fff",
      boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
      padding: "15px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    desc: {
      fontSize: "14px",
      marginTop: "5px",
      color: "#555",
    },
    btnGroup: {
      marginTop: "10px",
    },
    editBtn: {
      background: "#198754",
      color: "#fff",
      padding: "6px 12px",
      border: "none",
      borderRadius: "5px",
      marginRight: "5px",
      cursor: "pointer",
    },
    deleteBtn: {
      background: "#dc3545",
      color: "#fff",
      padding: "6px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <h1 style={styles.header}>Task Management Dashboard</h1>

        {/* Input Section */}
        <div>
          <input
            type="text"
            placeholder="Task Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Task Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.input}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button style={styles.button} onClick={handleAdd}>
            {editId ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {tasks.map((task) => (
            <div key={task.id} style={styles.card}>
              <h3 style={styles.title}>{task.title}</h3>
              <p style={styles.desc}>{task.description}</p>

              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(task.id, e.target.value)
                }
                style={styles.input}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <div style={styles.btnGroup}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}