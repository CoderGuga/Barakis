import axios from 'axios';
import { useState, useEffect } from 'react';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const App = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3001/tasks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h1>Items List</h1>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        <h2>{item.text}</h2>
                        <h2>{item.status}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;