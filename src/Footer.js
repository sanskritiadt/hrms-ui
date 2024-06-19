import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 ">
      <Container>
        <Row className="mb-2">
          <Col md={3} style={{marginBottom:'75px'}}>
            <h5 className="fw-bold">Alphadot Technologies</h5>
            <p>
            Java | SpringBoot | Microservices | Backend Development            </p>
          </Col>
          
         
          <Col md={3}  style={{marginBottom:'50px'}}>
            <h5 className="fw-bold">Services</h5>
            <ul className="list-unstyled">
              <li>Application Development</li>
              <li>Technology Consulting</li>
              <li>Cloud Transformation</li>
              <li></li>
            </ul>
          </Col>

         
          <Col md={3}>
            <h5 className="fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="lh-base"><i className="fas fa-phone mr-3"/> 0731-4201664 </li>
              <li className="lh-base"><i className="fas fa-envelope mr-3 "/>contact@alphadottech.com</li>
              <li ><i className="fas fa-home mr-3"/> <a style={{textDecoration:'none', color:'white'}} href='https://maps.app.goo.gl/sKVWHZgcjQX1dFNs8'>Ground Floor, Left Wing, MPSEDC STP Building, Electronic Complex, Sukhlia, Indore, Madhya Pradesh 452003</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h5 className="fw-bold">Location</h5>
            <iframe src="https://www.google.com/maps/d/u/0/embed?mid=15xUB4cYspA_TzvfiVmZv9EkA2gekftE&ehbc=2E312F&noprof=1" height="200"></iframe>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-4 mt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright: 
        <a className="text-white" href="#" style={{ textDecoration: 'none' }}> Alphadot Technologies</a>
      </div>
    </footer>
  );
}
