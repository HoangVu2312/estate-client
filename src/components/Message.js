
import React from 'react'
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Message() {
  // get data from redux-store
  const user = useSelector((state) => state?.user);
  const userMessageArr = user.messages;


  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Email</th>
          <th>phone</th>
          <th>message</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {userMessageArr?.map((message, index) => {
          return (
            <tr key={index}>
              <td>{message.client}</td>
              <td>{message.mail}</td>
              <td>{message.phoneNumber}</td>
              <td>{message.msg}</td>
              <td>{message.time}</td>
            </tr>
          );
        })}
      </tbody>
      
    </Table>
  )
}

export default Message