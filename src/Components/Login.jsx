import React, { useState } from 'react'
import styled from 'styled-components';
import { useAuth } from '../Contaxt/AuthContaxt';

function Login() {
    const {login}=useAuth()
    const [loading,setLoading] = useState(false)
    const [loginData,setLoginData] = useState({
        email:'',
        password:''
    })
    const handleLoginChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the target
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value, // Update the corresponding field
        }));
    };
      const handleLoginSubmit =(e)=>{
        e.preventDefault();
        setLoading(true)
        // console.log(loginData);
        
        login(loginData)
      }
    
  return (
    <LoginDiv>
          <div className="login-form-container">
            <h2 className="login-form-title">Admin Login</h2>
            <form className="login-form-layout">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              {
                loading ? (<>
                <p style={{textAlign:"center",color:"#2c3e50",fontSize:"1rem",fontWeight:"bold"}}>Loding ...</p>
                </>):(<></>)
              }
              <button type="submit" className="form-button" onClick={handleLoginSubmit}>
                Login
              </button>
            </form>
          </div>
        </LoginDiv>
  )
}
const LoginDiv = styled.div`
  /* LoginForm.css */
  .login-form-container {
    width: 300px;
    margin: 6rem auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .login-form-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
    color: #333;
  }

  .login-form-layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #555;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    transition: border-color 0.3s ease;
  }

  .form-input:focus {
    border-color: #007bff;
    outline: none;
  }

  .form-button {
    padding: 10px;
    font-size: 16px;
    color: #fff;
    // background-color: #2c3e50;
    background-color: #2c4e41;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .form-button:hover {
    // background-color: #0056b3;
    background-color: rgb(31, 53, 45);
  }
`;
export default Login