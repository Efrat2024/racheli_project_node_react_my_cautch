import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './store/userSlice'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

const myStore = configureStore({
  reducer: {
    userSlice
  }
})

root.render(
    <BrowserRouter>
    <Provider store={myStore}>
      <App />
    </Provider>
    </BrowserRouter>
);
reportWebVitals();
