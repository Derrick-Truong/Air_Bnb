import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <h1>Sign Up </h1>

                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    <input
                        type="text"
                        placeholder="First Name"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Last Name"
                    />
                </label>
                <label>

                    <input
                        type="text"
                        placeholder="Email"
                    />
                </label>
                <label>

                    <input
                        type="text"
                        placeholder="Username"
                    />
                
                </label>
                <label>

                    <input
                        type="text"
                        placeholder="Password"
                    />
                </label>
                <label>

                    <input
                        type="text"
                        placeholder="Confirm Password"
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
