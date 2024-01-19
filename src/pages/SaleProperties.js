import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import PropertyPreview from '../components/PropertyPreview';
import "../Style/SaleProperties.css";
import { GiBlockHouse } from "react-icons/gi";
import { MdOutlineApartment } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import axios from '../axios/axios';
import Pagination from '../components/Pagination';
import DestinationMap from '../components/DestinationMap';
import LeafLetMap from '../components/LeafLetMap';



function SaleProperties() {
  // set-up state for filter
  const [range, setRange] = useState(100000);
  const [searchTerm, setSearchTerm] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // get all the properties in redux-store
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`; // set the token as default header
    axios
      .get(`properties/properties?page=${currentPage}`)
      .then((response) => {
        const { properties, totalPages } = response.data; 
        setLoading(false);
        setProperties(properties);
        setTotalPages(totalPages);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [currentPage]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  // filtering function
  const propertiesSearch = properties
    .filter(
      (property) =>
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((property) => {
      const propertyPrice = parseFloat(property.price.replace(/\D/g, ""));

      return (
        propertyPrice >= range &&
        (selectedIcon
          ? property.title.toLowerCase().includes(selectedIcon)
          : true)
      );
    });

  const handleIconClick = (iconType) => {
    setSelectedIcon(iconType.toLowerCase());
  };

  // clear all filter
  const handleClearFilter = () => {
    setSelectedIcon(null);
  };

  //   props for the map
 const addresses = properties.map(property => property.address);

  return (
    <div className="property-container">
      <Row>
        <Col
          md={5}
          className="side-bar"
        
        >
          {/* <DestinationMap addresses={addresses} /> */}
          <LeafLetMap/>
        </Col>

        <Col md={7}>
          <div className="p-5">
            <button className="clear-button mb-3" onClick={handleClearFilter}>
              Clear Filter
            </button>

            <div className="d-flex justify-content-start mb-3 ">
              <input
                type="search"
                placeholder="city/country/type"
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-input'
              />
            </div>

            <div className="price-range">
              <h5 className="mb-3 ">Price range (100k - 2Mills) </h5>

              <input
                type="range"
                min={100000}
                max={2000000}
                step={10000}
                onChange={(e) => setRange(e.target.value)}
                onMouseOver={() => setTooltipVisible(true)}
                onMouseOut={() => setTooltipVisible(false)}
                className='range-input'
              />
              <span id="rangeValue">{range*0.001}</span>
            </div>

            {/* icon buttons */}
            <div className="d-flex flex-md-row justify-content-start">
              <div
                className="icons-button"
                onClick={() => handleIconClick("villa")}
              >
                <HiHomeModern size={60} />
                <span>Villa</span>
              </div>

              <div
                className="icons-button"
                onClick={() => handleIconClick("penthouse")}
              >
                <GiBlockHouse size={60} />
                <span>Penthouse</span>
              </div>

              <div
                className="icons-button"
                onClick={() => handleIconClick("apartment")}
              >
                <MdOutlineApartment size={60} />
                <span>luxury-home</span>
              </div>
            </div>
          </div>

          {/*------------------Properties Display--------------------  */}
          {propertiesSearch.length === 0 ? (
            <h1>No property to show</h1>
          ) : (
            <Row>
              {propertiesSearch?.map((property) => (
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

          <div className='d-flex justify-content-center mt-3'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SaleProperties;


