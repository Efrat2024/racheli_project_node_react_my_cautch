import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { TabMenu } from 'primereact/tabmenu';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';  // Import a PrimeReact theme
import 'primereact/resources/primereact.min.css';          // Import PrimeReact CSS
import 'primeicons/primeicons.css';                        // Import PrimeIcons
import 'primeflex/primeflex.css';                          // Import PrimeFlex

function AdminCouches() {
    const MyuserName = useSelector((myStore) => myStore.userSlice.userName)
    const [couches, setCouches] = useState([]);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);
    const navigate = useNavigate();

    //קשור לPRIME REACT
    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => { navigate('/hello') } },
        { label: 'My Couches', icon: 'pi pi-fw pi-couch', command: () => { navigate('/userCouch') } },
        { label: 'Cart', icon: 'pi pi-fw pi-shopping-cart', command: () => { navigate('/shopingCart') } },
        { label: 'Projact managment', icon: 'pi pi-fw pi-cog', command: () => { navigate('/adminCouch') } },
        { label: 'Add couch', icon: 'pi pi-fw pi-plus', command: () => { navigate('/adminCouch/addCouch') } }
    ];

    //כפתור יציאה
    const Logout = () => {
        localStorage.setItem('token', 'null');
        navigate('/');
    }

    //מעבר לדף עדכון ספה
    const updateCouch = (id) => {
        navigate(`/adminCouch/updateCouch/${id}`);
    }

    //מחיקת ספה
    const deleteCouch = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/couch/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            setCouches(couches.filter(couch => couch._id !== id));
            //קשור לPRIME REACT
            toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Couch deleted successfully', life: 3000 });
        } catch (error) {
            console.error('Error deleting couch:', error);
            //קשור לPRIME REACT
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error deleting couch', life: 3000 });
        }
    }

    //קשור לPRIME REACT
    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this couch?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteCouch(id),
            reject: () => toast.current.show({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled', life: 3000 })
        });
    }

//GET תציג את הספות על המסך
    useEffect(() => {
        const fetchCouches = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/couch',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                setCouches(response.data);
            } catch (err) {
                setError(err.message);
                console.log(err.message);
            }
        };

        fetchCouches();
    });

    //קשור לPRIME REACT
    const itemTemplate = (couch) => {
        return (
            <div className="p-col-12 p-md-3">
                <div className="product-item">
                    <img src={couch.images[0]} alt={couch.name} />
                    <div className="product-detail">
                        <h1 >{couch.name}</h1>
                        <p style={{ color: 'red', fontSize: '1.5rem' }}> {couch.description}</p>
                        <p>Catalog number: {couch.catalognumber}</p>
                        <p>Price: ${couch.price}</p>
                        <p>High: {couch.high}</p>
                        <p>Length: {couch.length}</p>
                        <p>Deep: {couch.deep}</p>
                    </div>
                    <div className='aaa'>
                        <Button label="Update" icon="pi pi-pencil" onClick={() => updateCouch(couch._id)} className="p-button-warning" />
                        <Button onClick={() => confirmDelete(couch._id)} icon="pi pi-times" label="Delete" className="p-button-danger" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-grid">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="navbar">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <div>{MyuserName}</div>
                <Button label="Logout" icon="pi pi-power-off" onClick={Logout} className="p-button-danger" />
            </div>
            <h1 style={{ textAlign: 'center', marginTop: '80px' }}></h1 >
            <div>
                <DataScroller value={couches} itemTemplate={itemTemplate} rows={couches.length} buffer={0.4} header="all of  out Products" />
                {error && <p>Error: {error}</p>}
            </div>

            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background-color: white;
                    z-index: 1000;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 20px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .content {
                    margin-top: 80px;
                    width: 100%;
                    padding: 20px;
                }
                .product-item {
                margin-top:100px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 20px;
                    margin: 10px;
                    background-color: #fff;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .product-item img {
                    width: 300px;
                    height: auto;
                    object-fit: cover;
                    margin-bottom: 15px;
                }
                .product-detail {
                    text-align: center;
                    margin-left: 300px;
                }
                .product-detail h5 {
                    margin: 0 0 10px 0;
                    font-size: 1.2em;
                    color: #333;
                }
                .product-detail p {
                    margin: 5px;
                    color: #666;
                }
                    .aaa{
                    margin-left:300px;
                    gap:5px;
                    display:flex;
                    flex-direction:row
                    }
            `}</style>
        </div>
    );
}

export default AdminCouches;