import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const TopNavbar = ({ onClick, completed, text }) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/inquiry">Trader Desktop</Navbar.Brand>
    <Nav className="link-container">
      <Nav.Link href="/inquiry">Inquiries</Nav.Link>
      <Nav.Link href="/offering">Offerings</Nav.Link>
      <Nav.Link href="/position">Positions</Nav.Link>
    </Nav>
  </Navbar>
)

export default TopNavbar