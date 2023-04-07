import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import logoImg from './Images/logo.png'
import './Hrmscss/navabr2.css'
import axios from 'axios';

function AppNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("response-token")

  function checkStatus() {
    const EmpID = localStorage.getItem("EmpID")
    axios.post(`/payroll/timeSheet/checkStatus/${EmpID}`, {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(res => {
      console.log(res.data)
      if (res.data.timeSheetStatus) {
        alert("please checkin!!")
      } else {
        alert("please checkout!!")
      }
    }).catch(err => {
      console.log(err)
      alert("error found in check status!!")
    })
  }

  const navigate = useNavigate();
  function handleLogin() {
    navigate('/login');
  }

  const handleLogout = () => {
    axios.post(`/api/user/logout`, {
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
      alert("logout successful!!")

    }).catch(error => {
      localStorage.clear();
      alert("error")
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
          <Navbar.Brand href="/">
            <img
              src={logoImg}
              width="100"
              height="100"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <NavLink className="nav-link " to="/">Homepage</NavLink> */}
              {/* <NavLink className="nav-link  " to="/RegisterUser">Register User</NavLink> */}
              <NavLink className="nav-link" onClick={checkStatus} to="/TimeSheet">TimeSheet</NavLink>

              {[
                {
                  title: 'Employee Management', links: [
                    { href: '/empfunc', text: 'Employee Details' },
                    { href: '/positiondetails', text: 'Employee Position' },
                  ]
                },
                {
                  title: 'Expense', links: [
                    { href: '/Capex', text: ' Create Capital Expense' },
                    { href: '/Getallexpenses', text: 'Get Expense Details' },
                    { href: '/createExpense', text: 'Create Expense' },
                  ]
                },
                {
                  title: 'Partner', links: [
                    { href: '/Getclientinfo', text: 'Get Client Info' },
                    { href: '/createClientformik', text: 'Create Client' },
                  ]
                },
                {
                  title: 'Employee Services', links: [
                    { href: '/payslip', text: 'Pay Slip' },
                  ]
                },
                {
                  title: 'Hiring', links: [
                    { href: '/createposition', text: 'Create Position' },
                    { href: '/createinterview', text: 'Create Interview' },
                    { href: '/getinterviewdetails', text: 'Get Interview Details' },
                    { href: '/getcandidate', text: 'Get Candidate details' },
                    { href: '/createCandidate', text: 'Create Candidate details' }
                  ]
                }
              ].map((item, index) => (
                <NavDropdown key={index} title={item.title} id={`basic-nav-dropdown${index}`}
                  show={dropdownOpen === index}
                  onMouseEnter={() => handleDropdownOpen(index)}
                  onMouseLeave={handleDropdownClose}>
                  {item.links.map((link, linkIndex) => (
                    <NavDropdown.Item key={linkIndex} href={link.href}>{link.text}</NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </Nav>
            <Nav className="ml-auto">
              <Button onClick={handleLogin} variant="outline-success" className="mx-2">Login</Button>
              <Button onClick={handleLogout} variant="outline-danger" className="mx-2">Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
}

export default AppNavbar;
