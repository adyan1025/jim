import React from 'react';
import './App.css';
import Home from './Home/Home';
import BodyReader from './BodyReader/BodyReader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<BodyReader/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
