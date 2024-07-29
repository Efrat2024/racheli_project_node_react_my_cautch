import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { TabMenu } from 'primereact/tabmenu';
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from "react-redux";

function UpdateCouch() {

  const { id } = useParams();
  const navigate = useNavigate();
  const MyuserName = useSelector((myStore) => myStore.userSlice.userName)
  const [couch, setCouch] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [high, setHigh] = useState('');
  const [length, setLength] = useState('');
  const [deep, setDeep] = useState('');
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const colorOptions = [
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'red', display: 'inline-block', marginRight: '8px' }}></span>Red</div>, value: 'red' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'blue', display: 'inline-block', marginRight: '8px' }}></span>Blue</div>, value: 'blue' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'green', display: 'inline-block', marginRight: '8px' }}></span>Green</div>, value: 'green' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'yellow', display: 'inline-block', marginRight: '8px' }}></span>Yellow</div>, value: 'yellow' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'black', display: 'inline-block', marginRight: '8px' }}></span>Black</div>, value: 'black' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'white', display: 'inline-block', marginRight: '8px', border: '1px solid #ccc' }}></span>White</div>, value: 'white' }
  ];

  const items = [
    { label: 'Projact managment', icon: 'pi pi-fw pi-cog', command: () => { navigate('/adminCouch') } }
  ];

  //עמוד אחורה
  const back = () => {
    navigate('/adminCouch');
  }

  //כשהקומפוננטה עולה תעדכן את מערך הספות ותביא לי את השדות מלאים לםי מה שהיה שאוכל לעדכן רק מה שאני רוצה
  useEffect(() => {
    const fetchCouch = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/couch/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const couchData = response.data;
        setCouch(couchData);
        setName(couchData.name);
        setDescription(couchData.description);
        setPrice(couchData.price);
        setColor(couchData.color);
        setHigh(couchData.high);
        setLength(couchData.length);
        setDeep(couchData.deep);
        setImages(couchData.images);
      } catch (error) {
        console.error('Error fetching couch data:', error);
      }
    };

    fetchCouch();
  });

//עדכון מוצר
  const update = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error('ID is missing');
      return;
    }
    try {
      const updatedCouch = { name, description, price, color, high, length, deep, images };
      await axios.put(`http://localhost:8000/api/couch/${id}`, updatedCouch, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Couch updated successfully!');
      navigate('/adminCouch');
    } catch (error) {
      console.error('Error updating couch:', error);
      alert('Error updating couch.');
    }
  };

  if (!couch) return <p>Loading...</p>;

  return (
    <div>
      <nav className="navbar">
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        <div>{MyuserName}</div>
        <Button label="back" icon="pi pi-angle-double-left" onClick={back} className="p-button-warning" />
      </nav>
      <h1 style={{ textAlign: 'center', marginTop: '80px' }}>Update couch</h1 >
      <div className="content">
        <div className="form-container">
          <form onSubmit={update} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', width: '100%' }}>
            <FloatLabel>
              <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
              <label htmlFor="name">Name</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%' }} />
              <label htmlFor="description">Description</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%' }} />
              <label htmlFor="price">Price</label>
            </FloatLabel>
            <FloatLabel>
              <Dropdown
                id="color"
                value={color}
                options={colorOptions}
                onChange={(e) => setColor(e.value)}
                placeholder="Select a Color"
                style={{ width: '100%' }}
              />
              <label htmlFor="color">Color</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="high" value={high} onChange={(e) => setHigh(e.target.value)} style={{ width: '100%' }} />
              <label htmlFor="high">High</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="length" value={length} onChange={(e) => setLength(e.target.value)} style={{ width: '100%' }} />
              <label htmlFor="length">Length</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="deep" value={deep} onChange={(e) => setDeep(e.target.value)} style={{ width: '100%' }} />
              <label htmlFor="deep">Deep</label>
            </FloatLabel>
            <Button label="Update Couch" type="submit" style={{ width: '100%', maxWidth: '250px' }} />
          </form>
        </div>
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
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .form-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top:0px;
        }
        .product-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 20px;
          margin: 10px;
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .product-item img {
          width: 100%;
          height: auto;
          max-width: 150px;
          object-fit: cover;
          margin-bottom: 15px;
        }
        .product-detail {
          text-align: center;
        }
        .product-detail h5 {
          margin: 0 0 10px 0;
          font-size: 1.2em;
          color: #333;
        }
        .product-detail p {
          margin: 5px 0;
          color: #666;
        }
      `}</style>
    </div>
  );
}

export default UpdateCouch;
