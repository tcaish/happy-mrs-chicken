import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import './index.scss';

const firebaseConfig = {
  apiKey: 'AIzaSyC-70Zr6uGGV_5BRuvs5682AaZXCV70gjE',
  authDomain: 'peppa-pig-happy-mrs-chic-74d6e.firebaseapp.com',
  projectId: 'peppa-pig-happy-mrs-chic-74d6e',
  storageBucket: 'peppa-pig-happy-mrs-chic-74d6e.appspot.com',
  messagingSenderId: '230163400797',
  appId: '1:230163400797:web:4da39d04ee5a71dc1325b4',
  measurementId: 'G-FZ324XLV7K'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
