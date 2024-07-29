import React from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';  // Import a PrimeReact theme
import 'primereact/resources/primereact.min.css';          // Import PrimeReact CSS
import 'primeicons/primeicons.css';                        // Import PrimeIcons
import 'primeflex/primeflex.css';

function Home() {
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
                background: 'url("/home.jpg") no-repeat center center',
                backgroundSize: 'cover',
                filter: 'blur(7px)', 
                zIndex: 1
            }}></div>
         
            <div className="p-card p-shadow-3 p-p-4" style={{
                width: '420px',
                height:'350px',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '2rem',
                zIndex: 2,
                position: 'relative'
            }}>
                <h1 className="p-mb-3" style={{ color: '#333333', fontWeight: 'bold' }}>Thank's for joing us !!!</h1>
                <p className="p-mb-4" style={{ fontSize: '1.1rem', color: '#a9a9a9' }}>log in or register to get the best sofa for you</p>
                <div className="p-d-flex p-flex-column p-ai-center">
                    <Button
                        label="log in"
                        className="p-mb-3 p-button-rounded"
                        onClick={() => window.location.href = '/login'}
                        style={{ width: '90%', backgroundColor: '#333333', color: 'white', marginBottom: '20px', border:'black' }}
                    />
                    <Button
                        label="register"
                        className="p-button-rounded"
                        onClick={() => window.location.href = '/register'}
                        style={{
                            width: '90%',
                            backgroundColor: 'white',
                            color: '#333333',
                            border: '1px solid gray'
                        }}
                    />
                </div>
                <div><h6>© To Yael luvinstein & Racheli liff</h6></div>
               
            </div>
        </div>
    );
}

export default Home;