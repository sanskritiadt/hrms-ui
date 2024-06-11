// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Navbar, Nav, Button, Container } from 'react-bootstrap';
// import logoImg from './Images/logo.png'
// import './Hrmscss/navabr2.css'
// import MyProfile from './MyProfile';
// import { useSelector } from 'react-redux';

// function AppNavbar() {
//   const [click, setclick] = useState(true);
//   const empId = useSelector((state) => state.auth.empId);
//   const name = useSelector((state) => state.auth.name);
//   useEffect(()=>{
    
//     if(empId){
//       setclick(false);
//     }
//   },[empId]);

//   const navigate = useNavigate();
//   function handleLogin() {
//     navigate('/login');
    
//   }

//   return (
//     <div className='main    '>
//       <Navbar expand="lg" className="navbar navbar-light bg-light ">
//         <Container fluid>
//           <Navbar.Brand href="/" className='p-0 m-0'>
//           <div className=''>
//             <img
//               src={logoImg}
              
//               className="d-inline-block align-top w-auto"
//               alt="Logo"
//             />
//             </div>
//           </Navbar.Brand>
//             <Nav className="ml-auto">

//               { click ? 
//               <Button onClick={handleLogin} variant="outline-success" className="mx-2 py-2 px-4">Login</Button> :
//               <MyProfile/>
//                 }
//             </Nav> 
//         </Container>
//       </Navbar>
//     </div>
//   );
// }

// export default AppNavbar;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logoImg from './Images/logo.png';
import './Hrmscss/navabr2.css';
import MyProfile from './MyProfile';
import { useSelector } from 'react-redux';

function AppNavbar() {
  const [click, setClick] = useState(true);
  const empId = useSelector((state) => state.auth.empId);
  const name = useSelector((state) => state.auth.name);

  useEffect(() => {
    if (empId) {
      setClick(false);
    }
  }, [empId]);

  const navigate = useNavigate();
  
  function handleLogin() {
    navigate('/login');
  }

  return (
    <div className="main">
      <Navbar expand="lg" className="navbar navbar-light bg-light">
        <Container fluid>
          <Navbar.Brand href="/" className="p-0 m-0">
            <div>
              <img
                src={logoImg}
                className="d-inline-block align-top w-auto"
                alt="Logo"
              />
            </div>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {click ? (
              <Button onClick={handleLogin} variant="outline-success" className="mx-2 py-2 px-4">
                Login
              </Button>
            ) : (
              <div className="d-flex align-items-center">
                <span className="mx-2">{name}</span>
                <MyProfile />
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
