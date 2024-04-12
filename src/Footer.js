import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <div>
    
      <footer className="footer  bg-dark  text-white  ">
      
        <Row className="justify-content-center ">
          <Col md={12} className="text-center">
            <p>Terms and Conditions | Privacy Policy</p>
            <p>Copyright © 2022 || <strong>Alphadot</strong>  </p>
            <p>All Rights Reserved</p>
          </Col>
        </Row>
     
    </footer>
    
    </div>
  );
}

