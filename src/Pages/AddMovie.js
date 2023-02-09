import axios from "axios";
import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MovieNavbar from "../Components/MovieNavbar";

export default function AddMovie() {
  const history = useHistory();
  const movie_name_reference = useRef();
  const movie_rating_reference = useRef();
  const movie_desc_reference = useRef();
  const addMovieHandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: movie_rating_reference.current.value,
      description: movie_desc_reference.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        { timeout: 10000 }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured !! Try again later !!!");
      }
    }
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        <h2>Add Movie</h2>
        <form onSubmit={addMovieHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Movie name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a movie name"
              ref={movie_name_reference}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              ref={movie_rating_reference}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              ref={movie_desc_reference}
              style={{height: "100px"}}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add a movie
          </Button>
        </form>
        <br />
        <Button variant="dark" type="submit">
          <Link to="/">Home</Link>
        </Button>
      </Container>
    </>
  );
}
