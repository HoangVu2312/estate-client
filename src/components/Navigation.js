import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { Navbar, Nav, Button, NavDropdown} from "react-bootstrap";
import { GrFavorite } from "react-icons/gr";
import "../Style/Navigation.css"




function Navigation() {

  // get state for conditional rendering
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // logout function => return to initial state
  function handleLogout() {
    dispatch(logout());
  }



  return (
    <Navbar expand="lg" className="navigation_bar">
        <div className='container'>
        <LinkContainer to='/'>
          <Navbar.Brand>UTOPIAS</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav'/> {/*repesent the toggle button*/}
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/saleproperties'>
              <Nav.Link ><h5>PROPERTY FOR SALE</h5></Nav.Link>
            </LinkContainer>

            {/* only show login when there is no user */}
            {!user && (
              <LinkContainer to='/login'>
              <Nav.Link>
                <button className='login-btn'><h5>Login</h5></button>
              </Nav.Link>
            </LinkContainer> 
            )} 

            {/* show when user not admin*/}
            {user && !user.isAdmin && (
              <LinkContainer to='/favorite'>
                <Nav.Link className='ms-3'><h5>FAVORITE</h5></Nav.Link>
              </LinkContainer>
            )}

            {/* if there is a user => render dropdown button */}
            {user && (
              <>
               <NavDropdown
                  title={`${user.name}`}
                >
                  {/* that user is admin */}
                  {user.isOwner && (
                    <>
                      <LinkContainer to="/owner-dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      
                      <LinkContainer to="/favorite">
                        <NavDropdown.Item>favorites <GrFavorite size={20}/></NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  {/* check again because this is another element */}
                  {!user.isOwner && (
                    <>
                      <LinkContainer to="/favorites">
                        <NavDropdown.Item>favorites <GrFavorite size={20}/></NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/booked">
                        <NavDropdown.Item>Booked Appointment</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="logout-btn ms-4 mt-2"
                  >
                    Logout
                  </Button>
                </NavDropdown>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
        </div>
    </Navbar>
  )
}

export default Navigation