import React from 'react'
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../Style/PropertyPreview.css"
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import ToastMessage from "../components/ToastMessage.js";
import { useSelector } from 'react-redux';
import { MdStars } from "react-icons/md";
import { useAddRemoveFavoriteMutation } from '../service/appApi.js';


function PropertyPreview({_id,title, description, price, pictures, facility }) {    // get prop from Home-component

  const [addRemoveFavorite, {isSuccess}] = useAddRemoveFavoriteMutation();
 

  const user = useSelector((state) => state.user);
  const isFavorite = Boolean(user?.favorite[_id]); // ? incase no user
  return (
    <LinkContainer
      to={`/properties/${_id}`}
      style={{ cursor: "pointer", width: "15rem" }}
    >
      <Card className="property-card">
        {pictures && pictures.length > 0 && (
          <Card.Img
            variant="top"
            className="preview-img"
            src={pictures[0].url}
            style={{ height: "130px", objectFit: "cover" }}
          />
        )}

        <Card.Body>
          <Card.Title style={{ position: "relative" }} >
            {title}
            <span
              onClick={() =>
                addRemoveFavorite({ userId: user._id, propertyId: _id })
              }
              style={{
                color: isFavorite ? "yellow" : "white",
                position: "absolute",
                top: "-50px",
                right: "-5px",
              }}
            >
              {isFavorite ? <MdStars size={20} /> : <MdStars size={20} />}
            </span>

            {isSuccess && (
              <ToastMessage
                bg="info"
                title="Added to cart"
                body={"check your favorite "}
              />
            )}
          </Card.Title>
          <Card.Text >
            <div>
              <h5>
                <Badge bg="warning" className="mr-5">
                  {price}
                </Badge>
              </h5>
            </div>

            <div>
              <MdOutlineBedroomParent /> {facility.bedrooms}
              <FaParking className="ms-2" /> {facility.carParks}
              <FaShower className="ms-2" /> {facility.bathrooms}
            </div>
          </Card.Text>

          <Card.Text className='d-flex flex-start'>{description}</Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default PropertyPreview