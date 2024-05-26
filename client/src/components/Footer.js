import React from "react";
import {Container, Row} from 'react-bootstrap'
export const Footer = () => {
  return (
    <footer className="footer bg-light" style={{bottom: '0', width: '100%', backgroundColor: '#f8f9fa', padding: '10px 0', textAlign: 'center'}}>
      <Container>
        <Row>
          <p>&copy;Copyright 2024. All Rights Reserved</p>
        </Row>
      </Container>
    </footer>
  );
};
