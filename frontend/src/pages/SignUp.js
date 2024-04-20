import React, { useState } from "react";
import { useSignup } from "../hooks/useSignUp";
import "./designlogin.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( email === "" || password === "") {
      alert("All fields are required");
      return;
    }
    await signup(email, password);
    // After successful signup, navigate to the login page
    alert('Registered Successfully')
    navigate('/');
  };

  return (
    <div className="signIn">
      {/* <div className='signIn-page-image' style={{ width: "50%" }}>

        <img style={{
          height: "100%",
          width: "100%",
          objectFit: "cover"
        }} src=".\loginImage.png" alt="LoginImage" />
      </div> */}
      <div className="signIn-form" style={{ width: "50%" }}>
        <div>
          <h2 className="login" style={{ textAlign: "center" }}>
            Mero Inventory
          </h2>
          <form className="mim-form" onSubmit={handleSubmit}>
            <div>
              <input
                className="mim-input"
                placeholder="Enter Email"
                style={{
                  borderBottom: "5px solid #AFD3E2",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  marginBottom: "20px",
                  backgroundImage: "url(./loginImage-userPofile.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "20px",
                }}
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <input
                className="mim-input"
                placeholder="Enter Password"
                style={{
                  borderBottom: "5px solid #AFD3E2",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  marginBottom: "20px",
                  backgroundImage: "url(./loginImage-userPassword.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "25px",
                }}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {/* <div
              style={{
                position: "relative",
                left: "54px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Forget Password ?
            </div> */}
            <button className="loginBtn" type="submit" disabled={isLoading}>Register</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
