import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import logoImg from './Images/logo.png'
import './Hrmscss/navabr2.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import MyProfile from './MyProfile';

function AppNavbar() {
  const [click, setclick] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("response-token");
  const empId = localStorage.getItem("EmpID");
  useEffect(()=>{
    
    if(empId){
      setclick(false);
    }
  },[empId]);

  const navigate = useNavigate();
  function handleLogin() {
    navigate('/login');
    
  }

  return (
    <div className='main    '>
      <Navbar expand="lg" className="navbar navbar-light bg-light ">
        <Container fluid>
          <Navbar.Brand href="/" className='p-0 m-0'>
          <div className=''>
            <img
              src={logoImg}
              
              className="d-inline-block align-top w-auto"
              alt="Logo"
            />
            </div>
          </Navbar.Brand>
           
            <Nav className="ml-auto">
              { click ? 
              <Button onClick={handleLogin} variant="outline-success" className="mx-2 py-2 px-4">Login</Button> :
              <MyProfile/>
                }
            </Nav> 
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;