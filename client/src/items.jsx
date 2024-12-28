import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './barakio.css';

const App = () => {
    const [items, setItems] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const location = useLocation(); // Hook to access the current route

    useEffect(() => {
        // Apply a specific class to <body> when this component is mounted
        if (location.pathname === '/items') {
            document.body.classList.add('custom-body-style'); // Add custom class
        }

        // Cleanup: Remove the class when the component is unmounted or route changes
        return () => {
            document.body.classList.remove('custom-body-style');
        };
    }, [location]);
        useEffect(() => {
            const token = sessionStorage.getItem("token");
            if (token)
            {
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
            }
            else
            {
            console.log('missing token');
            }
        }, [apiUrl]);

        //data mocking
        //useEffect(() => {
            // Mock data to simulate backend response
        /*    const mockItems = [
                { _id: "1", title: "First Post", description: "This is the description of the first post." },
                { _id: "2", title: "Second Post", description: "Here's some content fsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssorbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb the second post." },
                { _id: "3", title: "Third Post", description: "Another example of a post description." },
                { _id: "4", title: "Fourth Post", description: "test wrapping." },
                { _id: "1", title: "First Post", description: "This is the description of the first post." },
                { _id: "2", title: "Second Post", description: "Here's some content for the secondvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv post." },
                { _id: "3", title: "Third Post", description: "Another example of a post descriptfdvvvvvvvvvvvvvvion." },
                { _id: "4", title: "Fourth Post", description: "This one has a longer description to test wrapping." },
                { _id: "2", title: "Second Post", description: "Here's some content fosssssssssssssssssssssssssrbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb the second post." },
                { _id: "3", title: "Third Post", description: "Another example of a post description." },
                { _id: "4", title: "Fourth Post", description: "test wrapping." },
                { _id: "1", title: "First Post", description: "This is the description of the first post." },
                { _id: "2", title: "Second Post", description: "Here's some content for the secondvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv post." },
                { _id: "3", title: "Third Post", description: "Another example of a post descriptfdvvvvvvvvvvvvvvion." },
                { _id: "4", title: "Fourth Post", description: "This one has a longer description to test wrapping." },
            ];
    
            setItems(mockItems);
        }, []); // Empty dependency array ensures this runs once
        
        fetchItems();
    }, []);
    */
    const navigateToTasks = () => {
        window.location.href = '/tasks';
    }
    return (
        <div className="feed-container">
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
