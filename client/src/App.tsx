import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './component/Header/Header';
import MainMap from './component/MainMap/MainMap';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import Profile from './component/Account/Profile';
import Security from './component/Account/Security';
import Deactivate from './component/Account/Deactivate';
import Review from './component/Post/Post';
import BookMark from './component/BookMark/BookMark';
import Country from './component/Country/Country';
import PostFormModal from './component/PostFormMoal/PostFormModal';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainMap />} />
        <Route path="/:country" element={<Country />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/user/profile/:userNum" element={<Profile />} />
        <Route path="/user/security/:userNum" element={<Security />} />
        <Route path="/user/deactivate/:userNum" element={<Deactivate />} />
        <Route path="/review" element={<Review />} />
        <Route path="/bookmark" element={<BookMark />} />
        <Route path="/postform" element={<PostFormModal />} />
      </Routes>
    </div>
  );
}

export default App;
