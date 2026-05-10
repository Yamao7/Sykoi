import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../register/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const history = useHistory();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(password);

  function registration() {
    setNameErr(false);
    setEmailErr("");
    setPasswordErr("");

    let hasError = false;

    if (!username || !email || !password || !confirmPassword) {
      setNameErr(true);
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailErr("Please enter a valid email address.");
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordErr("Password must be at least 7 characters long and include both letters and numbers.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setPasswordErr("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    // Send to backend
    fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User registered successfully") {
          alert("Registration successful! Redirecting to login.");
          history.push("/");
        } else {
          setEmailErr(data.message || "Registration failed.");
        }
      })
      .catch((err) => {
        console.error(err);
        setEmailErr("Something went wrong. Try again later.");
      });
  }

  return (
    <div className="register-body">
      <div className="register-main">
        <h1>Register Form</h1>

        {nameErr && <p className="errP">*Please fill every input field*</p>}

        <p>Name</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />

        <p>Email</p>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailErr && <p className="errP">{emailErr}</p>}
        <br />

        <p>Password</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />

        <p>Confirm Password</p>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {passwordErr && <p className="errP">{passwordErr}</p>}
        <br /><br />

        <button onClick={registration}>Register</button>
        <p style={{ fontSize: '15px' }}>Already have an account? <Link to={''}>Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
