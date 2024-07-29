import React, { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { TabMenu } from 'primereact/tabmenu';
import { useSelector } from "react-redux";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function AddCouch() {
  const MyuserName = useSelector((myStore) => myStore.userSlice.userName)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [high, setHigh] = useState('');
  const [length, setLength] = useState('');
  const [deep, setDeep] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  //קשור לPRIME REACT
  const items = [
    { label: 'Projact managment', icon: 'pi pi-fw pi-cog', command: () => { navigate('/adminCouch') } }
  ];

  //קשור לPRIME REACT
  const colorOptions = [
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'red', display: 'inline-block', marginRight: '8px' }}></span>Red</div>, value: 'red' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'blue', display: 'inline-block', marginRight: '8px' }}></span>Blue</div>, value: 'blue' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'green', display: 'inline-block', marginRight: '8px' }}></span>Green</div>, value: 'green' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'yellow', display: 'inline-block', marginRight: '8px' }}></span>Yellow</div>, value: 'yellow' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'black', display: 'inline-block', marginRight: '8px' }}></span>Black</div>, value: 'black' },
    { label: <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '16px', height: '16px', backgroundColor: 'white', display: 'inline-block', marginRight: '8px', border: '1px solid #ccc' }}></span>White</div>, value: 'white' }
  ];

  //הוספת ספה
  const addCouch = async (stayOnPage) => {
    try {
      const newCouch = {
        name,
        description,
        price,
        color,
        high,
        length,
        deep,
        images: images || [],
      };

      const response = await axios.post('http://localhost:8000/api/couch', newCouch, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      //קשור לPRIME REACT
      toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message || 'Couch added successfully!', life: 3000 });

      if (stayOnPage) {
        setName('');
        setDescription('');
        setPrice('');
        setColor('');
        setHigh('');
        setLength('');
        setDeep('');
        setImages([]);
      } else {
        navigate('/adminCouch');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      //קשור לPRIME REACT
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
    }
  };


  //לחזור לדף קודם
  const back = () => {
    navigate('/adminCouch');
  }

  //קשור לPRIME REACT
  const addImage = () => {
    if (imageUrl) {
      setImages(prevImages => [...prevImages, imageUrl]);
      setImageUrl('');
    }
  };

  //קשור לPRIME REACT
  const confirm1 = () => {
    confirmDialog({
      message: 'האם אתה רוצה ליצור ספה נוספת?',
      header: 'אישור',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        addCouch(true);
      },
      reject: () => {
        addCouch(false);
      }
    });
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <nav className="navbar">
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        <div>{MyuserName}</div>
        <Button label="back" icon="pi pi-angle-double-left" onClick={back} className="p-button-warning" />
      </nav>
      <h1 style={{ textAlign: 'center', marginTop: '250px' }}>Add a new couch</h1 >
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', maxHeight: '500px', width: '100%' }}>
        <Toast ref={toast} />
        <ConfirmDialog />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FloatLabel>
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="name">Name</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="description">Description</label>
          </FloatLabel>

          <FloatLabel>
            <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="price">Price</label>
          </FloatLabel>

          <FloatLabel>
            <Dropdown id="color" value={color} options={colorOptions} onChange={(e) => setColor(e.value)} placeholder="Select a color" style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="color">Color</label>
          </FloatLabel>

          <FloatLabel>
            <InputNumber id="high" value={high} onValueChange={(e) => setHigh(e.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="high">High</label>
          </FloatLabel>

          <FloatLabel>
            <InputNumber id="length" value={length} onValueChange={(e) => setLength(e.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="length">Length</label>
          </FloatLabel>

          <FloatLabel>
            <InputNumber id="deep" value={deep} onValueChange={(e) => setDeep(e.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="deep">Deep</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', borderRadius: '10px' }} />
            <label htmlFor="imageUrl">Image URL</label>
          </FloatLabel>
          <Button onClick={addImage} label="Add Image" icon="pi pi-plus" style={{ marginTop: '10px' }} />

          {images.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <h4>Added Images:</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                ))}
              </div>
            </div>
          )}
          <Button onClick={confirm1} icon="pi pi-check" label="Confirm and set" style={{ width: '100%', maxWidth: '250px' }} />
        </div>
      </form>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background-color: white;
          z-index: 1000;
          display:

          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .content {
          margin-top: 80px;
          width: 100%;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .form-container {
          width: 100%;
          display: flex;
          justify-content: center;
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

export default AddCouch;
