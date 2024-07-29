import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function Hello() {
    const MyuserName = useSelector((myStore) => myStore.userSlice.userName)
    const navigate = useNavigate();

    //מעבר לדף מוצרים
    const goToProducts = () => {
        navigate('/userCouch');
    };

    return (
        <div className="p-d-flex p-flex-column p-ai-center p-jc-center" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'url("/2.jpg"), url("/3.jpg"), url("/4.jpg"), url("/5.jpg")',
                backgroundSize: '50% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left top, right top, left bottom, right bottom',
                filter: 'blur(4px)',
                zIndex: 1
            }}></div>

            <div className="p-card p-shadow-3 p-p-4" style={{
                width: '420px',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '2rem',
                zIndex: 2,
                position: 'relative'
            }}>
<div>
    <h1 className="p-mb-1" style={{ color: '#333333', fontWeight: 'bold', fontSize: '3rem', marginTop: '0px', marginBottom: '0px' }}>Hi,</h1>
    <p className="p-mb-1" style={{ fontSize: '2rem', marginTop: '0px', marginBottom: '0px' }}>{MyuserName} <br></br>Welcome to Lugano</p>
    <p className="p-mb-3" style={{ fontSize: '1.1rem', color: '#a9a9a9' }}>You can choose your favorite couch!!!</p>
</div>
                <Button
                    label="↓ To the most beautiful couches ↓"
                    className="p-button-rounded"
                    onClick={goToProducts}
                    style={{ width: '90%', backgroundColor: '#333333', color: 'white', border: 'black' }}
                />
            </div>
        </div>
    );
}

export default Hello;
