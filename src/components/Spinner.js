import React from 'react'
import "../Style/Spinner.css"
import { Container } from 'react-bootstrap';




const Spinner = () => {
    const spans = Array.from({ length: 20 }, (_, index) => (
      <span key={index} style={{ '--i': index + 1 }}></span>
    ));
  
    return (
      <Container className='spinner-container'>
        <div className='loader'>
          {spans}
          <div className='plane'></div>
        </div>
      </Container>
    );
  };
  
  

export default Spinner;


