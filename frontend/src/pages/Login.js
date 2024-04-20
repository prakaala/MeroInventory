import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin"
// import loginImage from '.\loginImage.png'
// import userProfileImage from '.loginImage-userPofile.png';
import "./designlogin.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const { login, error, isLoading } = useLogin()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("both field required")
      return;
    }
    await login(email, password)

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
          {/* <Link href="/signup">If you dont have account go to SignUP</Link> */}
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
            <button className="loginBtn" type="submit" disabled={isLoading}>Login</button>
            {error && <p className="error">{error}</p>}
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Don't have an account?{" "}
              <Link to="/signup">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
