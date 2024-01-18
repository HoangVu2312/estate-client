import axios from '../axios/axios';
import React, { useEffect, useState } from 'react'
import { Table, Spinner, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteAppointmentMutation } from '../service/appApi';
import ToastMessage from './ToastMessage';




function ClientAppointment() {

  // get data from redux-store
  const user = useSelector((state) => state?.user);
  const userId = user?._id;

  const properties = useSelector((state) => state?.properties)
  const [appointments, setAppointments] = useState([]);
  const [bookedProperties, setbookedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [deleteAppointment, {isSuccess,isLoading}]  = useDeleteAppointmentMutation();

  const handleDeleteAppointment = (id) => {
    if (window.confirm("Cancel your appintment??")) deleteAppointment({ appointmentId: id, userId });

  }



  useEffect(() => {
    setLoading(true);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`; 
    axios
      .get(`appointments/client/${userId}`)
      .then((Response) => {
        const {appointments,bookedProperties }= Response.data;
        setLoading(false);
        setAppointments(appointments);
        setbookedProperties(bookedProperties);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [userId, isSuccess]);


  if (loading) {
    return <Spinner/>;
  }

  if (appointments?.length === 0) {
    return <h1 className="text-center pt-4" style={{color:"#dbad65"}}>You don't have any appointments</h1>;
  }


  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Property</th>
          <th>Image</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((appointment) => {
          const property = properties.find((property) => property._id === appointment.propertyId);

          return (
            <tr key={appointment._id}>
              <td>{property?.title}</td>
              <td><img src={property.pictures[0].url} alt="property" style={{width:"100px", height: "100px", objectFit:"cover"}}/></td> 
              <td>{appointment.date}</td>
              <Button onClick={() => handleDeleteAppointment(appointment._id, appointment._clientId)} className="mt-4 ms-4 p-4  btn btn-danger" disabled={isLoading}> Cancel </Button>
            </tr>        
            );
        })}
        {isSuccess && (
                <ToastMessage
                  bg="warning"
                  title={"Your appointment is canceled"}
                  body={"check your appointments"}
                />
        )}
      </tbody>
      
    </Table>
  );
}

export default ClientAppointment