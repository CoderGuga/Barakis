{/*import React from "react";*/}
import axios from "axios"
import { useState } from "react"


function Text() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
        const user = JSON.parse(sessionStorage.getItem('user'));
        const _id = sessionStorage.getItem('_id');
        if (token) {
            axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {title, description, user, _id}, {headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .then(result => {console.log(result)
            })
        .catch (err=> console.log(err)) 
    } else {
        console.log("No token found")
    }
    }

    return(
        <div className="d-flex justify-content-center allign-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Forum</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Title</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        autoComplete="off"
                        name="text"
                        className="form-control rounded-0"
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Description</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        autoComplete="off"
                        name="description"
                        className="form-control rounded-0"
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Send
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Text;