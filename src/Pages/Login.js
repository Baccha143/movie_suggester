import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const email = useRef();
  const password = useRef();
  const [modalText, setModalText] = useState("");
  const [modalShown, setModalShown] = useState(false);
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        { timeout: 10000 }
      );
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);
      //alert(response.data.message);
      if (response.data.status === "success") {
        setModalText("Logged in successfully");
        setModalShown(true);
      }
      setTimeout(() => {
        history.replace("/");
      }, 1000);
    } catch (error) {
      if (error.response) {
        setModalText(error.response.data.errors[0].message);
        setModalShown(true);
      } else {
        setModalText("Unknown error occured !! Try again later !!!");
        setModalShown(true);
      }
    }
  };
  return (
    <>
      <Container>
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          {/*Email: <br />
     <input type="text" ref={email} /><br /><br />*/}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email}
              autoComplete={false}
            />
            {/*<Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text>*/}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
              autoComplete={false}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
      </Container>
      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(handleClose) => {
              setModalShown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
