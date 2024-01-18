import React from 'react'
import { Row, Col} from 'react-bootstrap'
import "../Style/Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


function Footer() {
  return (
    <div className='footer-container d-flex justify-content-center align-items-center'>
        <Row className='footer-row container'>
            <Col md={3} className=' d-flex  flex-column align-items-center mb-3'>
                <h3>Utopia</h3>
                <h5>Best rencides</h5>
                <h5>Best services</h5>
                <h5>Best choice</h5>
            </Col>
            
            <Col md={3} className=' d-flex flex-column align-items-center mb-3'>
                <h3>Follow us</h3>
                <div className='d-flex'><FaFacebook/><h5>Facebook</h5></div>    
                <div className='d-flex'><FaInstagram/>  <h5>Instagram</h5></div>
                <div className='d-flex'> <FaTwitter/> <h5>twittter</h5></div>

            </Col>

            <Col md={3} className=' d-flex flex-column align-items-center mb-3'>
                <h3>Our Links</h3>
                <ul>
                    <li><h5><a href='home'>Home</a></h5></li>
                    <li><h5><a href='recidence'>Recidencs</a></h5></li>
                    <li><h5><a href='contact'>Contact</a></h5></li>
                </ul>
            </Col>

            <Col md={3} className=' d-flex flex-column align-items-center'>
                <h3>Newsletter</h3>
                    <form>
                        <input type='email' placeholder='Enter your email' required/>
                    </form>
                
            </Col>

        </Row>
    </div>
  )
}

export default Footer