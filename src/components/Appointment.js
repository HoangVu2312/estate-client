import axios from '../axios/axios';
import React, { useEffect, useState } from 'react'
import { Table, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";




function Appointment() {

  // get data from redux-store
  const user = useSelector((state) => state?.user);
  const userId = user._id;

  const properties = useSelector((state) => state?.properties)
  const [appointments, setAppointments] = useState([]);
  const [bookedClients, setbookedClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`; 
    axios
      .get(`appointments/${userId}`)
      .then((Response) => {
        const {appointments,bookedClients }= Response.data;
        setLoading(false);
        setAppointments(appointments);
        setbookedClients(bookedClients);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [userId]);




  if (loading) {
    return <Spinner/>;
  }

  if (appointments?.length === 0) {
    return <h1 className="text-center pt-4">You don't have any appointments</h1>;
  }


  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Clients</th>
          <th>Property</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((appointment) => {
          const client = bookedClients.find((client) => client._id === appointment.clientId);
          const property = properties.find((property) => property._id === appointment.propertyId);

          return (
            <tr key={appointment._id}>
              <td>{client?.name}</td>
              <td><img src={property.pictures[0].url} alt="property" style={{width:"100px", height: "100px", objectFit:"cover"}}/></td> 
              <td>{property?.title}</td>
              <td>{appointment.date}</td>
            </tr>
          );
        })}
      </tbody>
      
    </Table>
  );
}

export default Appointment