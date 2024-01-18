import React from 'react'
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import DashboardProperty from '../components/DashboardProperty';
import NewProperty from '../components/NewProperty';
import Appointment from '../components/Appointment';
import Message from '../components/Message';

function OwnerDashboard() {
  return (
    <Container>
      <Tab.Container defaultActiveKey="owner-property">
        <Row>
          {/* side bar */}
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="owner-property"><h5>My Propperties</h5></Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="owner-appointment">
                <h5>My Appointments</h5> 
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="owner-message">
                <h5>My Messages</h5> 
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className='text-align-center'>
                <Nav.Link eventKey="create-property"><h5>Add Properties</h5></Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          {/* Display tabs*/}
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="owner-property">
                <DashboardProperty />
              </Tab.Pane>
              <Tab.Pane eventKey="owner-appointment">
                <Appointment />
              </Tab.Pane>
              <Tab.Pane eventKey="owner-message">
                <Message />
              </Tab.Pane>
              <Tab.Pane eventKey="create-property">
                <NewProperty />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default OwnerDashboard