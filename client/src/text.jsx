{/*import React from "react";*/}
import axios from "axios"
import { useState } from "react"


function Text() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [creatorID, setCreatorID] = useState()
    const [text, setText] = useState()
    const [status, setStatus] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/tasks', {title, description, creatorID, text, status })
        .then(result => {console.log(result)
        })
        .catch (err=> console.log(err)) 
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
                    <div className="mb-3">
                    <label htmlFor="email">
                        <strong>CreatorID</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter creatorID"
                        autoComplete="off"
                        name="creatorID"
                        className="form-control rounded-0"
                        onChange={(e) => setCreatorID(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Text</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter text"
                        autoComplete="off"
                        name="text"
                        className="form-control rounded-0"
                        onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Status</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter status"
                        autoComplete="off"
                        name="status"
                        className="form-control rounded-0"
                        onChange={(e) => setStatus(e.target.value)}
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