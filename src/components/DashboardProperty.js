import React from 'react'
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeletePropertyMutation } from '../service/appApi';



function DashboardProperty() {

    // get data from redux-store
    const owner = useSelector((state) => state?.user)
    const properties = useSelector((state) => state?.properties)
    const ownerProperties = properties.filter(property => property.userId === owner._id);
    
    // endpoint function to remove propertys
    const [deleteProperty, { isLoading}] = useDeletePropertyMutation();

    // admin can delete propertys right here
    function handleDeleteProperty(id) {
        if (window.confirm("Remove this recidence ??")) deleteProperty({ propertyId: id, userId: owner._id });
    }

  return (
    <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Options</th>
                </tr>
            </thead>

            <tbody>

                {/* The result of function below is an expression => in JSX must wrap in a curly brace {} */}
                {ownerProperties.map((property) => 
                    <tr key={property._id}>
                        <td><img src={property.pictures[0].url} style={{width:"100px", height: "100px", objectFit:"cover"}} alt="property"/></td> 
                        <td>{property._id}</td>
                        <td>{property.title}</td>
                        <td >{property.price}</td>

                        <td >
                           <Button onClick={() => handleDeleteProperty(property._id, owner._id)} className="m-2 btn btn-danger" disabled={isLoading}> Delete </Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
  )
}

export default DashboardProperty