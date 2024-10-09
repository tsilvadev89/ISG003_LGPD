import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemForm from './components/ItemForm/ItemForm';
import Login from './components/Login';
import Home from './components/home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<ItemForm />} />
        <Route path="/edit/:id" element={<ItemForm />} />
      </Routes>
    </Router>
  );
};

export default App;
