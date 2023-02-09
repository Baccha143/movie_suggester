import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MovieNavbar() {
  return (
    <>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand>
            <Link className="text-white" to="/">Movie suggester</Link> 
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <div>
                <Link className="text-white" to="/add">Add a movie</Link>
                <br />
                {localStorage.getItem("accessToken") ? (
                  <>
                    <Link className="text-white" to="/profile">Profile</Link>
                  </>
                ) : (
                  <>
                    <Link className="text-white" to="/login">Login</Link>
                  </>
                )}
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
