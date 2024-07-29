import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { useSelector, useDispatch } from "react-redux";
import { changeUserName } from "../store/userSlice";
import {jwtDecode} from "jwt-decode"

const Login = () => {

  const dispatch = useDispatch();
  const MyuserName = useSelector((myStore) => myStore.userSlice.userName)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //כפתור יציאה
  const Logout = () => {
    localStorage.setItem('token', 'null');
    navigate('/');
  }

  //נסיון כניסה
  const submit = async (e) => {
    e.preventDefault();
    try {
      const checkLogin = {
        email: username,
        password: password
      };

      const response = await axios.post('http://localhost:8000/api/auth/login', checkLogin);

      const token = response.data.accessToken
      localStorage.setItem('token', token);

      const dockedToken = token?jwtDecode(response.data.accessToken):null
     
      //שינוי המשתנה הגלובלי
      dispatch(changeUserName(dockedToken.fullname))

      navigate('/hello');

    } catch (error) {
      console.error('Login failed, please try again:', error);
      alert('Login failed, please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f8f8' }}>
      <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '20px' }}>Welcom back</h1>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', width: '100%' }}>
        <FloatLabel>
          <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
          <label htmlFor="username">Username</label>
        </FloatLabel>
        <FloatLabel>
          <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} toggleMask />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <Button label="Submit" type="submit" style={{ width: '100%', boxSizing: 'border-box', backgroundColor: 'green', color: 'white', borderRadius: '10px' }} />
        <div>
          <p style={{ display: 'inline-block', margin: 0 }}>Don't have an account?</p>
          <p style={{ display: 'inline-block', margin: '0 10px' }}>
            <Link to="/register" style={{ textAlign: 'center', color: 'blue' }}>register</Link>
          </p>
        </div>
        <Button label="Logout" icon="pi pi-power-off" onClick={Logout} className="p-button-danger" style={{ borderRadius: '10px', backgroundColor: "black", border: "black" }} />
      </form>
    </div>
  );
}

export default Login;