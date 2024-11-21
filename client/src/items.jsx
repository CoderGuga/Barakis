import axios from 'axios';
import { useState } from "react"
import { useEffect } from 'react';

const App = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
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
