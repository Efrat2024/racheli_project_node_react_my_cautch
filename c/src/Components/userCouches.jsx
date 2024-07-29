import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { TabMenu } from 'primereact/tabmenu';
import { Galleria } from 'primereact/galleria';
import { classNames } from 'primereact/utils';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function UserCouches() {

    const MyuserName = useSelector((myStore) => myStore.userSlice.userName)
    const [couches, setCouches] = useState([]);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState({});
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [isAutoPlayActive, setAutoPlayActive] = useState({});
    const [isFullScreen, setFullScreen] = useState(false);
    const navigate = useNavigate();
    const galleria = useRef(null);

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => { navigate('/hello') } },
        { label: 'My Couches', icon: 'pi pi-fw pi-couch', command: () => { navigate('/userCouch') } },
        { label: 'Cart', icon: 'pi pi-fw pi-shopping-cart', command: () => { navigate('/shopingCart') } },
        { label: 'Project Management', icon: 'pi pi-fw pi-cog', command: () => { navigate('/adminCouch') } },
    ];

    const responsiveOptions = [
        { breakpoint: '1024px', numVisible: 5 },
        { breakpoint: '768px', numVisible: 3 },
        { breakpoint: '560px', numVisible: 1 }
    ];

    const Logout = () => {
        localStorage.setItem('token', 'null');
        navigate('/');
    };

    //הוספה לסל
    const addToCart = async (id) => {
        const addCouch = { couch: id };
        try {
            const response = await axios.post('http://localhost:8000/api/shopingCart', addCouch, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Response from server:', response);
            alert('Added to cart: ');
        } catch (err) {
            console.error('Error adding to cart:', err.response?.data || err.message);
        }
    };


    useEffect(() => {
        const a = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/couch', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setCouches(response.data);
                console.log('Fetched couches:', response.data);
            } catch (err) {
                setError(err.message);
            }
        };
        a();
    });

    //קשור לPRIME REACT
    const itemTemplate = (item) => {
        if (!item || !item.itemImageSrc) {
            return null;
        }

        if (isFullScreen) {
            return <img src={item.itemImageSrc} alt={item.alt} />;
        }
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    };

    //קשור לPRIME REACT
    const thumbnailTemplate = (item) => {
        return (
            <div className="grid grid-nogutter justify-content-center">
                <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />
            </div>
        );
    };

    return (
        <div className="p-grid">
            <div className="navbar">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <div>{MyuserName}</div>
                <Button label="Logout" icon="pi pi-power-off" onClick={Logout} className="p-button-danger" />
            </div>
            <div className="content">
                <DataScroller value={couches} itemTemplate={(couch) => {
                    const images = couch.images.map(image => ({
                        itemImageSrc: image,
                        thumbnailImageSrc: image,
                        alt: couch.name,
                        title: couch.name
                    }));

                    return (
                        <div className="product-item">
                            <Galleria ref={galleria} value={images} activeIndex={activeIndex[couch._id] || 0} onItemChange={(e) => setActiveIndex(prevState => ({ ...prevState, [couch._id]: e.index }))}
                                showThumbnails={showThumbnails} showItemNavigators showItemNavigatorsOnHover
                                numVisible={5} circular autoPlay transitionInterval={3000} responsiveOptions={responsiveOptions}
                                item={itemTemplate} thumbnail={thumbnailTemplate}
                                style={{ maxWidth: '500px' }} className="custom-galleria" />
                            <div className="product-detail" style={{ textAlign: 'center', marginRight: "50px", marginLeft: "200px" }}>
                                <h1 style={{ fontSize: '2rem' }} >{couch.name}</h1>
                                <p style={{ fontSize: '1.5rem', color: 'red' }}> {couch.description}</p>
                                <p style={{ marginTop: '0px' }}>Catalog Number: {couch.catalognumber}</p>
                                <p>color: {couch.color}</p>
                                <p>Price: ${couch.price}</p>
                                <p>Height: {couch.high}</p>
                                <p>Length: {couch.length}</p>
                                <p>Depth: {couch.deep}</p>
                            </div>

                            <Button style={{ fontSize: 'rem', marginLeft: '100px' }}
                                icon="pi pi-cart-plus"
                                severity="cart-plus"
                                aria-label="cart-plus"
                                label='add to cart'
                                onClick={() => addToCart(couch._id)}
                            />
                        </div>
                    );
                }} rows={couches.length} buffer={0.4} header="List of Products" />
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
                }
                .product-item {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ddd; /* קו גבול אופציונלי */
                    border-radius: 5px; /* קצוות מעוגלים אופציונליים */
                    background-color: #f9f9f9; /* צבע רקע אופציונלי */
                    max-height:400px;
                    gap:10px;
                    margin-top:10px;
                }
                .custom-galleria-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem;
                    background-color: #f4f4f4;
                    border-top: 1px solid #ddd;
                }
                .title-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .fullscreen-button {
                    margin-left: auto;
                }
            `}</style>
        </div>
    );
}

export default UserCouches;