{/*import React from "react";*/}
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"  

function Login() {
    const [email, setMail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${apiUrl}/users/login`, {email, password})
        .then(result => {console.log(result)
                if (result.data.token){
                    sessionStorage.setItem('token', result.data.token)
                    sessionStorage.setItem('user', JSON.stringify(result.data.user))
                    sessionStorage.setItem("_id", result.data.user._id)
                }
                navigate('../tasks')
        })
        .catch (err=> console.log(err)) 
    }

    return(
        <div className="d-flex justify-content-center allign-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="mail"
                        className="form-control rounded-0"
                        onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Login;