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

          {/* <Col md={3}>
            <h5 className="fw-bold">Location</h5>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3681.0666354316254!2d75.8349824!3d22.6885632!3m2!1i1024!2i768!4f13.1!3m3
            !1m2!1s0x39631dda7f0f6299%3A0xeb3565f797c941e!2sAlphaDot%20Technologies%20-%20Java%20%7C%20SpringBoot%20%7C%20Microservices%20%7C%20Backend%20De
            velopment!5e0!3m2!1sen!2sin!4v1718277951849!5m2!1sen!2sin"
             width="400" height="300" style="border:0;"></iframe>
          </Col> */}    
        </Row>
      </Container>
      <div className="text-center py-4 mt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright: 
        <a className="text-white" href="#" style={{ textDecoration: 'none' }}> Alphadot Technologies</a>
      </div>
    </footer>
  );
}
