import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";  // Import react-bootstrap here
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import Destination from './components/DestinationMap';
import PropertyPage from './pages/PropertyPage';
import SaleProperties from './pages/SaleProperties';
import City from './pages/City'
import ChatBox from './components/ChatBox';
import {Modal} from 'react-bootstrap';
import { useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import OwnerDashboard from './pages/OwnerDashboard';
import Favorite from './pages/Favorite';
import { FaCircleDot } from "react-icons/fa6";


// socketio-connection
import { io } from 'socket.io-client';
const socket = io.connect("http://localhost:4000");



function App() {
  const user = useSelector((state) => state?.user); //loged-in user
  
  const [show, setShow] = useState(false);// the status of pop-up table
  const handleClose = () => setShow(false);
  

  return (
    <BrowserRouter>
      <Navigation />

      {/* Chat pop-up */}
      <div style={{ cursor: "pointer" }} onClick={() => setShow(true)} className='chat-icon'>
         <IoChatbubbleEllipses size={80}/>
      </div>

      {/* Calender model */}
      <Modal show={show} className="chatbox-model modal-sm ml-5" onHide={handleClose} centered>
        <Modal.Header closeButton className='chat-model-header'> <FaCircleDot /> Utopia Support</Modal.Header>
        <ChatBox socket={socket} />
      </Modal>

      <Routes>
        <Route index element={<Home />} />

        {!user && ( // only show these pages when there is no user(conditional rendering)
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {user && user.isOwner && (
          <>
            <Route path="owner-dashboard" element={<OwnerDashboard />} />
          </>
        )}

        <Route path="*" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/saleproperties" element={<SaleProperties />} />
        <Route path="/properties/:id" element={<PropertyPage />} />
        <Route path="/city/:city" element={<City />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
