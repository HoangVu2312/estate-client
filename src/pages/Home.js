import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';
import { Col, Row } from 'react-bootstrap';
import "../Style/Home.css"
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import PropertyPreview from '../components/PropertyPreview.js';
import { Link, useNavigate } from 'react-router-dom';
import locations from '../components/Locations.js';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPhoneVolume } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaRocketchat } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios/axios.js'
import { updateProperties } from '../features/propertySlice.js';
import { GiScales } from "react-icons/gi";
import { GiFamilyHouse } from "react-icons/gi";
import { BsBank } from "react-icons/bs";
import Footer from '../components/Footer.js';
import Clock from '../components/Clock.js';



function Home() {

  // Carousel set-up
    const imagesArr = [
        {url: "https://images.unsplash.com/photo-1415889455891-23bbf19ee5c7?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=60"},
        {url: "https://images.unsplash.com/photo-1500069329338-1f270dce111f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=60"},
        {url: "https://images.unsplash.com/photo-1448670439281-3a2c30e6d4da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=60"}
      ];
    const handleDragStart = (e) => e.preventDefault();
    const items = imagesArr.map((picture, index) => (
        <div key={index} className="item">
          <img className="home_carousel-image" src={picture.url} onDragStart={handleDragStart} alt={`prod-${index}`} />
        </div>
    ));

    // search function
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState();

    const handleSearch = () =>{
      navigate(`city/${searchTerm}`)
    }
    
    
    // Get new properties from redux-store
    const properties = useSelector((state) => state?.properties);
    const bestProperties = properties?.slice(0, 8)
    const dispatch = useDispatch();

    // async action  
    useEffect(() => {
      axios.get("/properties/home").then(({ data }) => dispatch(updateProperties(data))); // send data to redux-store
    }, [dispatch]);  // => re-run whenever dispatch changes.


  

  return (
    <div>
      {/* Title */}
      <div className="landing-container">
        <Row className="justify-content-center">
          <Col md={6}></Col>

          <Col md={6} className="home_title_container">
            <div className="main_title">
              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "ease-in",
                }}
              >
                Discover Most <br /> Suitable Property
              </motion.h1>
              <div className="orange-circle" />
            </div>

            <div className="home_secondary_text">
              <span>
                Find a variety of properties that suit you very easilty
              </span>{" "}
              <br />
              <span>
                Forget all difficulties in finding a residence for you
              </span>
            </div>

            <div className="search-bar">
              <HiLocationMarker className="marker" color="blue" size={25} />
              <input type="text" placeholder="city/location" onChange={(e) => setSearchTerm(e.target.value)}/>
              <button className="button" onClick={handleSearch}>Search</button>
            </div>

            <div className="flexCenter stats">
              <div className="flexColCenter stat">
                <span>
                  <CountUp start={8800} end={9000} duration={4} />{" "}
                  <span>+</span>
                </span>
                <span className="secondaryText">Premium Product</span>
              </div>

              <div className="flexColCenter stat">
                <span>
                  <CountUp start={1950} end={2000} duration={4} />{" "}
                  <span>+</span>
                </span>
                <span className="secondaryText">Happy Customer</span>
              </div>

              <div className="flexColCenter stat">
                <span>
                  <CountUp end={28} /> <span>+</span>
                </span>
                <span className="secondaryText">Awards Winning</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* best properties */}
      <div className="fav-properties-container container mt-5">
        <h3>Best Properties</h3>
        <div>
          <Link
            to="/properties"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more{">>"}
          </Link>
        </div>

        <Row className="mt-2">
          {bestProperties?.map((property) => (
            <Col
              md={3}
              className="d-flex justify-content-center"
              key={property._id}
            >
              <PropertyPreview key={property._id} {...property} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Service */}
      <div
        className="service-container mt-5"
        style={{ position: "relative", width: "100vw", height: "80vh" }}
      >
        <div
          className="home_img_container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <AliceCarousel
            mouseTracking
            items={items}
            autoPlay
            autoPlayInterval={3000} // Set the interval to 3 seconds
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="service-container-text">
          <div className="service-text-center mb-5">
            <h3>Our service</h3>
            <h5>
              We are always ready to help by providing the best services for
              you. We believe a good place to live can make your life better.
            </h5>
          </div>

          <div className="service-text-row">
            <Row>
              <Col md={4} className="service-text">
                <GiFamilyHouse size={80} className="mb-3" />
                <h4>Real Estate Purchase</h4>
              </Col>
              <Col md={4} className="service-text">
                <GiScales size={80} className="mb-3" />
                <h4>Legal Consultation</h4>
              </Col>
              <Col md={4} className="service-text">
                <BsBank size={80} className="mb-3" />
                <h4>Bank-Loan Assistant</h4>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* top locations */}
      <div className="location-container mt-5">
        <h3 className="mb-5">Top Destinations</h3>
        <Row className="d-flex justify-content-center mt-2">
          {locations.map((location, index) => (
            <LinkContainer
              to={`/city/${location.name.toLocaleLowerCase()}`}
              key={index}
            >
              <Col md={1}>
                <div className="location-title">
                  <div
                    className="circle"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${location.img})`,
                    }}
                  ></div>
                  <span>{location.name}</span>
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    

      {/* contact */}
      <div className="contact-container">
        <Row>
          <Col md={6} className="contact-info justify-content-center align-items-center p-5">
            <Row>
              <div>
              <h3>Contact us</h3>
              <p>
                We are always ready to help by providing the best services for
                you.
              </p>
              </div>

              <Col md={6}>
                
                  <div className="d-flex justify-content-center align-items-center p-3 m-3 contact-text">
                    <FaPhoneVolume size={35} className='ms-3' />
                    <h5>+358 403601709</h5>
            
                  
                  </div>
                
              </Col>

              <Col md={6}>
                
                  <div className=" d-flex justify-content-center align-items-center p-3 m-3 contact-text">
                    <FaFacebookSquare size={35} className='ms-3' />
                    <h4>Facebook</h4>
                  

                  </div>
               
              </Col>

              <Col md={6}>
                
                  <div className=" d-flex justify-content-center align-items-center p-3 m-3 contact-text">
                    <FaRocketchat size={35} className='ms-3'/>
                    <h4>Online chat</h4>
                  
                  </div>
               
              </Col>

              <Col md={6}>
                
                  <div className=" d-flex justify-content-center align-items-centert p-3 m-3 contact-text">
                    <IoChatboxEllipses size={35} className='ms-3'/>
                    <h4>Message</h4>
                  </div>              
              </Col>
              <div className=" d-flex justify-content-center mt-3">
                <button className="call-button">Call Us Now</button>
              </div>

            </Row>
          </Col>

          <Col md={6} className='clock-section'>
            <div className="d-flex justify-content-center align-items-center flex-column contact-text">
              <h3 className='mb-5'>We are always available when you needs us</h3>
              <Clock/>
            </div>
          </Col>
        </Row>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Home