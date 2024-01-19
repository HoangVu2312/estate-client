// This component display a single city page

import axios from "../axios/axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PropertyPreview from "../components/PropertyPreview";
// import DestinationMap from "../components/DestinationMap";
import "../Style/City.css"
import LeafLetMap from "../components/LeafLetMap";


function City() {
  const { city } = useParams(); //

  // local states
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);


  // fetch all products belong to this category to update local state
  useEffect(() => {
    setLoading(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`; // set the token as default header
    axios
      .get(`/properties/city/${city}`)
      .then(({ data }) => {
        setLoading(false);
        setProperties(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [city]); // re-run when category param change

  if (loading) {
    return <Spinner animation="border" variant="primary" />;;
  }

//   props for the map
const addresses = properties.map(property => property.address);

 
  
  return (
    <div className="city-page-container">
      <Row>
        <Col md={5} className="side-bar mb-5" style={{minHeight:"100vh"}}>
            {/* <DestinationMap addresses={addresses} city={city}/> */}
            <LeafLetMap addresses={addresses} city={city}/>
        </Col>

        <Col md={7}>
        <Container>
          <Row >
            {properties.map((property) => (
              <Col xs={12} sm={6} md={4} key={property._id} className="d-flex justify-content-center align-items-center">
                <PropertyPreview {...property} />
              </Col>
            ))}
          </Row>
        </Container>
        </Col>
      </Row>
      
        
    </div>
  );
}

export default City;