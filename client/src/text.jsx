{/*import React from "react";*/}
import axios from "axios"
import { useState } from "react"


function Text() {
    const [text, setText] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/text', {text })
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
                        <strong>Name</strong>
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
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Send
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Text;