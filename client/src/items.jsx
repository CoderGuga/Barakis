import axios from 'axios';
import { useState, useEffect } from 'react';
import './barakio.css';

const App = () => {
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(null); // State to track the item being edited
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const userId = sessionStorage.getItem("_id");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const fetchItems = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/tasks`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setItems(response.data);
                    console.log(response.data);
                } catch (err) {
                    console.error("Error:", err.response ? err.response.data : err.message);
                }
            };

            fetchItems();
        } else {
            console.log('missing token');
        }
    }, [apiUrl]);

    const navigateToTasks = () => {
        window.location.href = '/tasks';
    }

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                await axios.delete(`${apiUrl}/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setItems(items.filter(item => item._id !== id)); // Update the state to remove the deleted item
            } catch (err) {
                console.error("Error:", err.response ? err.response.data : err.message);
            }
        } else {
            console.log("No token found");
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setEditTitle(item.title);
        setEditDescription(item.description);
    };

    const handleSave = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.patch(`${apiUrl}/tasks/${editItem._id}`, {
                    title: editTitle,
                    description: editDescription,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setItems(items.map(item => item._id === editItem._id ? response.data : item)); // Update the state with the edited item
                setEditItem(null); // Clear the edit state
            } catch (err) {
                console.error("Error:", err.response ? err.response.data : err.message);
            }
        } else {
            console.log("No token found");
        }
    };

    return (
        <div className="github-container">
            <h1 className="github-title">Items List</h1>
            <ul className="posts-grid">
                {items.map((item) => (
                    <li key={item.createdAt} className="post-card">
                        <h2 className="post-title">{item.title}</h2>
                        <h3 className="post-name">{item.userName}</h3>
                        <h3 className="post-description">{item.description}</h3>
                        {userId === item.user && (
                            <>
                                <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {editItem && (
                <div className="edit-form">
                    <h2>Edit Item</h2>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditItem(null)}>Cancel</button>
                </div>
            )}
            <button className="floating-button" onClick={navigateToTasks}>
                <img src="plus.png" alt="Add Task" className="floating-button-icon" />
            </button>
        </div>
    );
};

export default App;