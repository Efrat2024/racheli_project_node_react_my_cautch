import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import axios from "axios";
import { FloatLabel } from 'primereact/floatlabel';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Register() {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [fullname, setFullname] = useState('');
  const navigate = useNavigate();

  //כפתור יציאה
  const Logout = () => {
    localStorage.setItem('token', 'null');
    navigate('/');
  }

  //נסיון הרשמה
  const submit = async (e) => {
    e.preventDefault(); 
    try {
      const checkRegister = {
        fullname,
        password,
        email: username,
        phone,
        street,
        zipCode
      };
      const response = await axios.post('http://localhost:8000/api/auth/register', checkRegister);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.response?.data || 'An error occurred');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f8f8' }}>
      <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '20px' }}>Create new account</h1>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', width: '100%' }}>
        <FloatLabel>
          <InputText id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
          <label htmlFor="fullname">Full Name</label>
        </FloatLabel>
        <FloatLabel>
          <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} toggleMask />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
          <label htmlFor="username">Username</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
          <label htmlFor="phone">Phone</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="street" value={street} onChange={(e) => setStreet(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
          <label htmlFor="street">Street</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
          <label htmlFor="zipCode">Zip Code</label>
        </FloatLabel>
        <Button label="Submit" type="submit" style={{ width: '100%', boxSizing: 'border-box', backgroundColor: 'green', color: 'white', borderRadius: '10px' }} />
        <div>
          <p style={{ display: 'inline-block', margin: 0 }}>Already have an account?</p>
          <p style={{ display: 'inline-block', margin: '0 10px' }}>
            <Link to="/login" style={{ textAlign: 'center', color: 'blue' }}>Login</Link>
          </p>
        </div>
        <Button label="Logout" icon="pi pi-power-off" onClick={Logout} className="p-button-danger" style={{ borderRadius: '10px', backgroundColor : "black",border : "black"}} />
      </form>
    </div>
  );
}

export default Register;