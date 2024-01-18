import React, { useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import "../Style/addProperty.css";
import { useCreatePropertyMutation } from "../service/appApi";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { useSelector } from "react-redux";
import LocationMap from "./LocationMap";

function NewProperty() {
  // Local state for multi-step form -> keep track of current step
  const [step, setStep] = useState(1);

  // combine state => save data when move to next page
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    country: "",
    city: "",
    address: "",
    images: [],
    facility: {
      bedrooms: "0",
      carParks: "0",
      bathrooms: "0",
    },
  });

  const userId = useSelector((state) => state.user._id);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProperty, { isError, error, isLoading, isSuccess }] =
    useCreatePropertyMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setImgToRemove(null);
        setFormData((prevData) => ({
          ...prevData,
          images: prevData.images.filter(
            (img) => img.public_id !== imgObj.public_id
          ),
        }));
      })
      .catch((e) => console.log(e));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.country ||
      !formData.city ||
      !formData.address ||
      formData.images.length === 0 ||
      !formData.facility.bedrooms ||
      !formData.facility.carParks ||
      !formData.facility.bathrooms
    ) {
      return alert("Please fill out all the fields");
    }
    // formData obj must be named property 
    createProperty({ property: formData, userId }).then(({ data }) => {
      //successful create a property
      if (data) {
        setTimeout(() => {
          navigate("/"); // return to home after 1.5 sec
        }, 1500);
      }
    });
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Use cloudinary to get or save the real image files => only save the file url in Mongoose db
  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "datjdbueh",
        uploadPreset: "estate-site",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setFormData((prevData) => ({
            ...prevData,
            images: [
              ...prevData.images,
              { public_id: result.info.public_id, url: result.info.url },
            ],
          }));
        }
      }
    );
    widget.open();
  }

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="container d-flex justify-content-center">
              <div
                className="location"
                style={{ flex: 1, marginRight: "20px" }}
              >
                <Form.Group controlId="country" style={{ height: "100px" }}>
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        country: e.target.value,
                      }))
                    }
                    value={formData.country}
                  >
                    <option disabled value="">
                      -- Select One --
                    </option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                    <option value="Norway">Norway</option>
                    <option value="Spain">Spain</option>
                    <option value="Greece">Greece</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Swizerland">Swizerland</option>
                    <option value="Finland">Finland</option>
                    <option value="Romania">Romania</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Austria">Austria</option>
                    <option value="Denmark">Denmark</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="city" style={{ height: "100px" }}>
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        city: e.target.value,
                      }))
                    }
                    value={formData.city}
                  >
                    <option disabled value="">
                      -- Select One --
                    </option>
                    {formData.country === "France" && (
                      <>
                        <option value="Paris">Paris</option>
                        <option value="Marseille">Marseille</option>
                        <option value="Lille">Lille</option>
                        <option value="Strasbourg">Strasbourg</option>
                        <option value="Toulouse">Toulouse</option>
                      </>
                    )}
                    {formData.country === "Italy" && (
                      <>
                        <option value="Rome">Rome</option>
                        <option value="Venice">Venice</option>
                        <option value="Milan">Milan</option>
                        <option value="Catania">Catania</option>
                        <option value="Verona">Verona</option>
                      </>
                    )}
                    {formData.country === "UK" && (
                      <>
                        <option value="London">London</option>
                        <option value="Glasgow">Glasgow</option>
                        <option value="Edinburgh">Edinburgh</option>
                        <option value="Manchester">Manchester</option>
                        <option value="Belfast">Belfast</option>
                      </>
                    )}
                    {formData.country === "Germany" && (
                      <>
                        <option value="Berlin">Berlin</option>
                        <option value="Munich">Munich</option>
                        <option value="Frankfurt">Frankfurt</option>
                        <option value="Hamburg">Hamburg</option>
                        <option value="Dresden">Dresden</option>
                      </>
                    )}
                    {formData.country === "Norway" && (
                      <>
                        <option value="Oslo">Oslo</option>
                        <option value="Bergen">Bergen</option>
                        <option value="Tromso">Tromso</option>
                        <option value="Stavanger">Stavanger</option>
                        <option value="Trondheim">Trondheim</option>
                      </>
                    )}
                    {formData.country === "Spain" && (
                      <>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Alicante">Alicante</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Toledo">Toledo</option>
                        <option value="Velencia">Velencia</option>
                      </>
                    )}
                    {formData.country === "Greece" && (
                      <>
                        <option value="Athens">Athens</option>
                        <option value="Santorini">Santorini</option>
                        <option value="Corfu">Corfu</option>
                        <option value="Paros">Paros</option>
                        <option value="Mykonos">Mykonos</option>
                      </>
                    )}
                    {formData.country === "Portugal" && (
                      <>
                        <option value="Lisbon">Lisbon</option>
                        <option value="Porto">Porto</option>
                        <option value="Sintra">Sintra</option>
                        <option value="Cascais">Cascais</option>
                        <option value="Funchal">Funchal</option>
                      </>
                    )}
                    {formData.country === "Sweden" && (
                      <>
                        <option value="Stockholm">Stockholm</option>
                        <option value="Gothenburg">Gothenburg</option>
                        <option value="Malmo">Malmo</option>
                        <option value="Uppsala">Uppsala</option>
                        <option value="Abisko">Abisko</option>
                      </>
                    )}
                    {formData.country === "Switzerland" && (
                      <>
                        <option value="Zurich">Zurich</option>
                        <option value="Genava">Genava</option>
                        <option value="Lucerne">Lucerne</option>
                        <option value="Basel">Basel</option>
                        <option value="Bern">Bern</option>
                      </>
                    )}
                    {formData.country === "Finland" && (
                      <>
                        <option value="Helsinki">Helsinki</option>
                        <option value="Tampere">Tampere</option>
                        <option value="turku">turku</option>
                        <option value="Lahti">Lahti</option>
                        <option value="Vanta">Vanta</option>
                      </>
                    )}
                    {formData.country === "Romania" && (
                      <>
                        <option value="Bucharest">Bucharest</option>
                        <option value="Oradea">Oradea</option>
                        <option value="Brasov">Brasov</option>
                        <option value="Sibiu">Sibiu</option>
                        <option value="Lasi">Lasi</option>
                      </>
                    )}
                    {formData.country === "Netherlands" && (
                      <>
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="Gronigen">Gronigen</option>
                        <option value="Leiden">Leiden</option>
                        <option value="Haarlem">Haarlem</option>
                        <option value="Arnhem">Arnhem</option>
                      </>
                    )}
                    {formData.country === "Estonia" && (
                      <>
                        <option value="Tallinn">Tallinn</option>
                        <option value="Tartu">Tartu</option>
                        <option value="Narva">Narva</option>
                        <option value="Vijandi">Vijandi</option>
                        <option value="Valga">Valga</option>
                      </>
                    )}
                    {formData.country === "Austria" && (
                      <>
                        <option value="Vienna">Vienna</option>
                        <option value="Graz">Graz</option>
                        <option value="Linz">Linz</option>
                        <option value="Salzburg">Salzburg</option>
                        <option value="Villach">Villach</option>
                      </>
                    )}
                    {formData.country === "Denmark" && (
                      <>
                        <option value="Copenhagen">Copenhagen</option>
                        <option value="Aarhus">Aarhus</option>
                        <option value="Odense">Odense</option>
                        <option value="Billund">Billund</option>
                        <option value="Ribe">Ribe</option>
                      </>
                    )}
                    
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        address: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </div>
              
              <div style={{width: "450px", height: "350px", objectFit:"cover"}}>
                <LocationMap />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <Form.Group
            controlId="images"
            className="container"
          >
            <Button type="button" onClick={showWidget}>
              Upload Images
            </Button>
            <div className="images-preview-container">
              {formData.images?.map((image) => (
                <div className="image-preview" key={image.public_id}>
                  <img
                    src={image.url}
                    alt="product"
                    style={{ maxWidth: "30%", height: "auto" }}
                  />
                  {/* check if the image is not removed yet => show icon to remove */}
                  {imgToRemove !== image.public_id && (
                    <i
                      className="fa fa-times-circle"
                      onClick={() => handleRemoveImg(image)}
                    ></i>
                  )}
                </div>
              ))}
            </div>
          </Form.Group>
        );
      case 3:
        return (
          <>
            <Form.Group controlId="title">
              <Form.Label style={{ marginBottom: "5px" }}>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label style={{ marginBottom: "5px" }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label style={{ marginBottom: "5px" }}>Price</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    price: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </>
        );
      case 4:
        return (
          <>
            <Form.Group controlId="bedrooms">
              <Form.Label>Number of Bedrooms</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.facility.bedrooms}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    facility: {
                      ...prevData.facility,
                      bedrooms: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="parking">
              <Form.Label>Number of Parking Spaces</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.facility.carParks}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    facility: {
                      ...prevData.facility,
                      carParks: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="bathrooms">
              <Form.Label>Number of Bathrooms</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.facility.bathrooms}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    facility: {
                      ...prevData.facility,
                      bathrooms: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        {renderForm()}
        {isSuccess && (
          <Alert variant="success">Your property is now online</Alert>
        )}
        {isError && <Alert variant="danger">{error.data}</Alert>}

        <div className="d-flex justify-content-center mt-5">
          <Button variant="primary" onClick={handlePrev} disabled={step === 1}>
            Previous
          </Button>{" "}
          <Button variant="primary" onClick={handleNext} disabled={step === 4}>
            Next
          </Button>{" "}
          {step === 4 && (
            <Button
              variant="success"
              type="submit"
              disabled={isLoading || isSuccess}
            >
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default NewProperty;