import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Container, Table, Row, Col, Form, Modal} from 'react-bootstrap';
import "../Style/PropertyPage.css";
import ToastMessage from "../components/ToastMessage.js";
import { useState } from 'react';
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { useAddRemoveFavoriteMutation, useCreateMessageMutation, useCreateAppointmentMutation  } from '../service/appApi.js';
import { MdStars } from "react-icons/md";
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import LeafLetLocation from '../components/LeafLetLocation.js';

function PropertyPage() {

  // Get prop id and curent user
  const { id } = useParams();
  const user = useSelector((state) => state?.user); //loged-in user
  const properties = useSelector((state) => state?.properties);

  // Appoiment pop-up
  const [show, setShow] = useState(false);// the status of pop-up table

  const [clientMessage, setClientMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [createMessage, {isSuccess: isCreateMessageSuccess}] = useCreateMessageMutation();

  const handleMessageSubmit = (event) => {
     event.preventDefault();
     createMessage({clientMessage, ownerId: property.userId})
  }

  const [formData, setFormData] = useState({
    clientId: "",
    ownerId: "",
    propertyId: "",
    date: dayjs().format('YYYY-MM-DD'),
  });

  const [createAppointment, {isSuccess: isCreateAppointmentSuccess}] = useCreateAppointmentMutation();

  const handleDateConfirm = () => {
    createAppointment(formData);
    setShow(false);
  };

  function showAppointment() { 
    if (user) {
      setShow(true);
    } else {
      alert("You need to log in to book")
    }
    
  }
  const handleClose = () => setShow(false);

 


  // set up local state
  const [property, setProperty] = useState(null);

  const [addRemoveFavorite, {isSuccess: isFavoriteOperationSuccess}] = useAddRemoveFavoriteMutation();

  // stop broser's defaut => allow to drag images to slide
  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    // find property in store based on id
    const property = properties.find((p) => p._id === id); // local property => not relate to property

    if (property) {
      setProperty(property);
    }
  }, [id, properties]);

  if (!property) {
    return <Alert>property is gone</Alert>
  }

  // make an array of img element to display in carousel
  const images = property.pictures.map((picture) => <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} alt="prod" 
  style={{ cursor: "pointer", maxHeight: "570px", width: "100%", boxSizing: "border-box", objectFit: "cover" }}/>); //with: 100% => responsive

  // check if prop is in user fav 
  const isFavorite = Boolean(user?.favorite[id]);  // ? incase there no user



  return (
    <Container className="pt-4 prpperty-container">
      <div className="carousel-images" style={{ position: "relative" }}>
        <AliceCarousel
          mouseTracking
          items={images}
          controlsStrategy="alternate"
        />
      </div>

      <Row style={{ position: "relative" }}>
        <Col lg={4}>
          <div className="d-flex justify-content-between">
            <h3>Highlights</h3>
            <div
              onClick={() =>
                addRemoveFavorite({ userId: user?._id, propertyId: id })
              }
              style={{ color: isFavorite ? "yellow" : "black" }}
            >
              {isFavorite ? <MdStars size={30} /> : <MdStars size={30} />}
            </div>
          </div>
          {isFavoriteOperationSuccess && (
            <ToastMessage
              bg="info"
              title={isFavorite ? "added to fav" : "removed from fav"}
              body={"check your favorite "}
            />
          )}
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{property.title}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{property.price}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{property.country}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{property.city}</td>
              </tr>
              <tr>
                <td>
                  Bedrooms <MdOutlineBedroomParent />
                </td>
                <td>{property.facility.bedrooms}</td>
              </tr>
              <tr>
                <td>
                  Car parks <FaParking />
                </td>
                <td>{property.facility.carParks}</td>
              </tr>
              <tr>
                <td>
                  Bathrooms <FaShower />
                </td>
                <td>{property.facility.bathrooms}</td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Col
          lg={8}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{objectFit:"cover", paddingLeft:"130px", paddingRight:"120px", height:"370px"}}
        >
          <LeafLetLocation
            address={property?.address}
            city={property?.city}
            country={property?.country}
          />
          <br />
          <div>📍 {property?.address}</div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={4} className="mb-5">
          <h3>Basic description</h3>
          <Table bordered hover style={{ maxHeight: "100%", maxWidth: "100%" }}>
            <tbody>
              <tr>
                <td className="description-input">{property.description}</td>
              </tr>
            </tbody>
          </Table>

          {/* appoiment button */}
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%" }}
          >
            <button
              className="appointment-btn"
              onClick={() => showAppointment()}
            >
              Book an appoiment
            </button>
          </div>

          {isCreateAppointmentSuccess && (
            <ToastMessage
              bg="info"
              title={"We got it"}
              body={"You have an appointment !!"}
            />
          )}

          {/* Calender model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Choose a date</Modal.Title>
            </Modal.Header>

            <Calendar
              onChange={(value) =>
                setFormData({
                  ...formData,
                  date: value,
                  clientId: user._id,
                  ownerId: property.userId,
                  propertyId: property._id,
                })
              }
              value={formData.date}
            />

            <button
              onClick={handleDateConfirm}
              style={{ width: "30%", alignSelf: "center" }}
              className="mb-3 confirm-btn"
            >
              Confirm
            </button>
          </Modal>
        </Col>

        <Col lg={8} className="d-flex justify-content-center ps-5">
          <Form
            style={{ width: "70%" }}
            className="newsletter-form mb-5"
            onSubmit={handleMessageSubmit}
          >
            <h3>Get more information</h3>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter firstname"
                  className="newsletter-input"
                  onChange={(e) =>
                    setClientMessage((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lastname"
                  className="newsletter-input"
                  onChange={(e) =>
                    setClientMessage((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="newsletter-input"
                  onChange={(e) =>
                    setClientMessage((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="phone number"
                  className="newsletter-input"
                  onChange={(e) =>
                    setClientMessage((prevData) => ({
                      ...prevData,
                      phone: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                className="newsletter-input"
                onChange={(e) =>
                  setClientMessage((prevData) => ({
                    ...prevData,
                    message: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Receive our newsletter?" />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <button type="submit" className="info-form-btn">
                Submit
              </button>
            </div>
            {isCreateMessageSuccess && (
              <ToastMessage
                bg="light"
                title={"We got it"}
                body={"The owner got your message !!"}
              />
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyPage;
