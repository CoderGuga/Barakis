import axios from 'axios';
import { useState, useEffect } from 'react';
import './barakio.css';

const App = () => {
    const [items, setItems] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

        useEffect(() => {
            const token = sessionStorage.getItem("token");
            if (token)
            {
                const fetchItems = async () => {
                    try {
                        const response = await axios.get(`${apiUrl}/items`, {
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
            }
            else
            {
            console.log('missing token');
            }
        }, [apiUrl]);

    const navigateToTasks = () => {
        window.location.href = '/tasks';
    }
    return (
        <div className="github-container">
            <h1 className="github-title">Items List</h1>
            <ul className="posts-grid">
                {items.map((item) => (
                    <li key={item._id} className="post-card">
                        <h2 className="post-title">{item.title}</h2>
                        <h3 className="post-description">{item.description}</h3>
                    </li>
                ))}
            </ul>
            <button className="floating-button" onClick={navigateToTasks}>
                <img src="plus.png" alt="Add Task" className="floating-button-icon" />
            </button>
        </div>
    );
};

export default App;
