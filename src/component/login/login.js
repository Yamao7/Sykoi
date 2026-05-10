import React, { useState } from "react";
import "../register/register.css";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginNameErr, setLoginNameErr] = useState(false);
  const [loginPasswordErr, setPasswordErr] = useState(false);
  const [incorrectErr, setIncorrectErr] = useState(false);

  const history = useHistory();

  function Loginvalidation() {
    setLoginNameErr(false);
    setPasswordErr(false);
    setIncorrectErr(false);

    let hasError = false;

    if (loginName.trim().length === 0) {
      setLoginNameErr(true);
      hasError = true;
    }

    if (loginPassword.trim().length === 0) {
      setPasswordErr(true);
      hasError = true;
    }

    if (hasError) return;

    // Send to backend
    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: loginName, password: loginPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Assuming your backend returns user data like { message: "Login successful", user: { id: "...", name: "..." } }
        if (data.message === "Login successful" && data.user) {
          // Store the user data in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(data.user));
          setIncorrectErr(false);
          history.push("/home");
        } else {
          setIncorrectErr(true);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setIncorrectErr(true);
      });
  }

  return (
    <div className="login-body">
      <div className="login-main">
        <h1>Login</h1>
        {incorrectErr && <small style={{ color: 'red', textAlign: 'center' }}>Enter the correct username and password</small>}
        <br />
        <p>Name</p>
        <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} />
        {loginNameErr && <small style={{ color: '#d3521d' }}>Please enter the Username</small>}
        <br />
        <p>Password</p>
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        {loginPasswordErr && <small style={{ color: '#d3521d' }}>Please enter the password </small>}
        <br />
        <button onClick={Loginvalidation}>Login</button><br />
        <p style={{ fontSize: '15px' }}>Doesn't have an account yet? <Link to={'/register'}>Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
