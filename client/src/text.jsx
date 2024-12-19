import axios from "axios";
import { useState } from "react";
import "./barakio.css"; // Ensure the CSS file is linked

function Text() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const _id = sessionStorage.getItem("_id");

    if (token) {
      axios
        .post(
          `${apiUrl}/tasks`,
          { title, description, user, _id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => console.log(result))
        .catch((err) => console.error("Error:", err.response ? err.response.data : err.message));
    } else {
      console.log("No token found");
    }
  };

  return (
    <div className="github-container">
      <h1 className="github-title">Create Task</h1>
      <form onSubmit={handleSubmit} className="github-form">
        <div className="github-input-group">
          <label htmlFor="title" className="github-label">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="github-input"
          />
        </div>
        <div className="github-input-group">
          <label htmlFor="description" className="github-label">Description</label>
          <textarea
            id="description"
            placeholder="Enter description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="github-textarea"
          ></textarea>
        </div>
        <button type="submit" className="github-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Text;
