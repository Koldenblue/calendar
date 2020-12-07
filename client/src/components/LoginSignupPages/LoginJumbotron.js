import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export default function LoginJumbotron() {
  return (
    <Jumbotron className='login-jumbotron' fluid>
      <Container>
        <h1 className='login-title'>Weekly Calendar</h1>
      </Container>
    </Jumbotron>
  )
}