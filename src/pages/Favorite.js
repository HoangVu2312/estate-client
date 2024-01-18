import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropertyPreview from '../components/PropertyPreview';

function Favorite() {

    const user = useSelector((state) => state?.user);
    const properties = useSelector((state) => state?.properties);
    const userFavoriteObj = user?.favorite;

    const favRecidences = userFavoriteObj
    ? properties.filter((property) => userFavoriteObj[property._id] != null)
    : [];

   

  return (
    <Container>
        {favRecidences.length === 0 ? (
            <h1>No property to show</h1>
          ) : (
            <Row className="mt-2">
              {favRecidences?.map((property) => (
                <Col
                  md={4}
                  className="d-flex justify-content-center"
                  key={property._id}
                >
                  <PropertyPreview key={property._id} {...property} />
                </Col>
              ))}
            </Row>
          )}
    </Container>
  )
}

export default Favorite
