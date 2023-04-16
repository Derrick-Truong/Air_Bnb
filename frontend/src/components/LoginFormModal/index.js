// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res?.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const handleSubmitDemo = (e) => {
        e.preventDefault();

        return dispatch(sessionActions.login({ credential:"DerrickTruong", password:"password" }))
            .then(closeModal)

    };

    return (
        <div className ="log-in-container">
            <h1 className="log-in-title">Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors?.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Username or Email
                    <h7></h7>
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}

                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {/* <button
                    className="demo-login-submit-button"
                     onClick={() => {
                     setCredential("DerrickTruong");
                     setPassword("password");
                     }}
                     type="click"
                     >
                     Demo User
                     </button> */}

                <button disabled={(credential.length < 4 || password.length < 6) ? true : false} type="submit">Log In</button>
            </form>
            <button
                className="demo-login-submit-button"
                onClick={handleSubmitDemo}
                // onClick={() => {
                //     setCredential("DerrickTruong");
                //     setPassword("password");
                // }}
                type="click"
            >
                Demo User
            </button>
        </div>
    );
}

export default LoginFormModal;
