import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MovieNavbar from "../Components/MovieNavbar";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [modalShown, setModalShown] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured !! Try again later !!!");
      }
    }
  };
  const onLogout = () => {
    setModalShown(true);
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        Name: {userData.name} <br />
        Email: {userData.email} <br />
        Country: {userData.country} <br />
        <Button onClick={onLogout} variant="danger" type="button">
          Logout
        </Button>
        <Modal
          show={modalShown}
          onHide={() => {
            setModalShown(false);
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Are you sure you want to log out ?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                localStorage.removeItem("accessToken");
                history.push("/");
              }}
            >
              Yes
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setModalShown(false);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={onLogout}
          variant="danger"
          type="button"
        >
          <Link to="/">Home</Link>
        </Button>
      </Container>
    </>
  );
}
