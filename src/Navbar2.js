import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import logoImg from './Images/logo.png'
import './Hrmscss/navabr2.css'
import axios from 'axios';
import { toast } from 'react-toastify';

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
  
  function checkStatus() {
    axios.post(`/payroll/timeSheet/checkStatus/${empId}`, {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err)
    })
  }
  const navigate = useNavigate();
  function handleLogin() {
    navigate('/login');
    
  }

  const handleLogout = () => {
    axios.post(`/apigateway/api/user/logout`, {
      "deviceInfo": {
        "deviceId": "D1",
        "deviceType": "DEVICE_TYPE_ANDROID",
        "notificationToken": null
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      localStorage.clear();
      console.log(res.data);
      toast.success('Logout-Successfull.', { position: "top-center", theme: "colored" });
      // window.location.reload();
      setclick(true);

    }).catch(error => {
      localStorage.clear();
      toast.error('server error Cannot Logout.', { position: "top-center", theme: "colored" });
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
    navigate('/login');
  }
  const handleDropdownOpen = (id) => {
    setDropdownOpen(id);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(null);
  };

  return (
    <div className='main'>
      <Navbar expand="lg" className="navbar navbar-light bg-light">
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav"  className='d-flex justify-content-end'>
           
            <Nav className="ml-auto">
              { click ? 
              <Button onClick={handleLogin} variant="outline-success" className="mx-2 py-2 px-4">Login</Button> :
              <Button onClick={handleLogout} variant="outline-danger" className="mx-2">Logout</Button>
                }
            </Nav>
          </Navbar.Collapse> 
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;