import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { TabMenu } from 'primereact/tabmenu';
import { useSelector } from "react-redux";
import 'primereact/resources/themes/saga-blue/theme.css';  // Import a PrimeReact theme
import 'primereact/resources/primereact.min.css';          // Import PrimeReact CSS
import 'primeicons/primeicons.css';                        // Import PrimeIcons
import 'primeflex/primeflex.css';

function ShopingCart() {

    const MyuserName = useSelector((myStore) => myStore.userSlice.userName)
    const [couches, setCouches] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    //קשור לPRIME REACT
    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => { navigate('/hello') } },
        { label: 'My Couches', icon: 'pi pi-fw pi-couch', command: () => { navigate('/userCouch') } },
        { label: 'Cart', icon: 'pi pi-fw pi-shopping-cart', command: () => { navigate('/shopingCart') } },
        { label: 'Projact managment', icon: 'pi pi-fw pi-cog', command: () => { navigate('/adminCouch') } },
    ];

    //כפתור יציאה
    const Logout = () => {
        localStorage.setItem('token', 'null');
        navigate('/');
    };

    //מחיקת מוצר
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/shopingCart/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProducts(products.filter(product => product._id !== id));
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product.');
        }
    };

    //כשהקופוננטה עולה המערכים יתעכדכנו בהתאם
    useEffect(() => {
        const bringProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/shopingCart', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
                console.log('Fetched products:', response.data); 
            } catch (err) {
                setError(err.message);
            }
        };

        bringProduct();

        const bringCouches = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/couch', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCouches(response.data);
                console.log('Fetched couches:', response.data); 
            } catch (err) {
                setError(err.message);
            }
        };

        bringCouches();
    });

    //קשור לPRIME REACT
    const increment = async (product) => {
        console.log(product._id);
        const newAmount = product.amount + 1;
        try {
            await axios.put(`http://localhost:8000/api/shopingCart/${product._id}`, { amount: newAmount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setProducts(products.map(p => p._id === product._id ? { ...p, amount: newAmount } : p));
        } catch (error) {
            console.error('Error updating amount:', error);
            alert('Error updating amount.');
        }
    };

    //קשור לPRIME REACT
    const decrement = async (product) => {
        const newAmount = product.amount - 1;
        if (newAmount < 0) return;  // לא לאפשר ערך שלילי
        try {
            await axios.put(`http://localhost:8000/api/shopingCart/${product._id}`, { amount: newAmount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setProducts(products.map(p => p._id === product._id ? { ...p, amount: newAmount } : p));
        } catch (error) {
            console.error('Error updating amount:', error);
            alert('Error updating amount.');
        }
    };

//קשור לPRIME REACT
    const itemTemplate = (product) => {
        console.log(product);
        const currentCouch = couches.find(c => c._id === product.couch);

        if (!currentCouch) {
            return <div className="product-item">no product available</div>;
        }

        return (
            <div className="p-col-12 p-md-3"style={{marginTop:'50px'}} >
                <div className="product-item">
                    <img src={currentCouch.images[0]} alt={currentCouch.name}style={{width:'400px'}} />
                    <div className="product-detail">
                        <h1 >{currentCouch.name}</h1>
                        <p style={{color:'red',fontSize:'1.5rem'}}> {currentCouch.description}</p>
                        <p>Catalog number: {currentCouch.catalognumber}</p>
                        <p>Price: ${currentCouch.price}</p>
                        <p>Height: {currentCouch.high}</p>
                        <p>Length: {currentCouch.length}</p>
                        <p>Depth: {currentCouch.deep}</p>
                    </div>
                    <div className="flex-buttons">
                        <span className="amount-container">{product.amount}</span> {/* תצוגת כמות */}
                        <Button icon="pi pi-plus" className="p-button-outlined p-button-rounded p-button-success" onClick={() => increment(product)}></Button>
                        <Button icon="pi pi-minus" className="p-button-outlined p-button-rounded" onClick={() => decrement(product)}></Button>
                        <Button label="Delete" icon="pi pi-trash" onClick={() => deleteProduct(product._id)} />
                    </div>
                </div>

            </div>
        );
    };


    return (
        <div className="p-grid">
            <div className="p-col-12 p-md-6"></div>
            <div className="navbar">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <div>{MyuserName}</div>
                <Button label="Logout" icon="pi pi-power-off" onClick={Logout} className="p-button-danger" />
            </div>
            <div>
                <DataScroller value={products} itemTemplate={itemTemplate} rows={products.length} buffer={0.4} header="My shoping cart" />
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
    display: flex; /* השתמש ב-Flexbox */
    justify-content: space-between; /* סידור הפריטים בקצוות */
    align-items: center; /* סידור הפריטים במרכז האנכי */
    padding: 10px; /* רווח פנימי */
    border: 1px solid #ddd; /* קו גבול */
    border-radius: 5px; /* קצוות מעוגלים */
    background-color: #f9f9f9; /* צבע רקע */
}

.product-item img {
    height: auto; /* שמירה על פרופורציות התמונה */
    margin-right:20px; /* רווח בין התמונה לטקסט */
}

.product-detail {
    flex: 1; /* תופס את כל השטח הפנוי בין התמונה לכפתורים */
    text-align: center; /* מרכז את הטקסט */
}

.flex-buttons {
    display: flex; /* השתמש ב-Flexbox */
    flex-direction: column; /* סידור הכפתורים בעמודה */
    gap: 10px; /* רווח בין הכפתורים */
    align-items: center; /* מרכז את הכפתורים */
}

.amount-container {
    margin-bottom: 10px; /* רווח בין הכמות לכפתורים */
    font-size: 2rem; /* גודל טקסט לכמות */
    font-weight: bold; /* הדגשת הטקסט */
}


            `}</style>
        </div>
    );
}

export default ShopingCart;