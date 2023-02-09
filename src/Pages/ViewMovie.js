import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MovieNavbar from "../Components/MovieNavbar";

export default function ViewMovie() {
  const getParams = useParams();
  const getID = getParams.id;

  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    getSingleMovieData();
  });

  const getSingleMovieData = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error found");
    }
  };

  return (
    <>
      <MovieNavbar />
      <Container>
        <h2> Movie Detail:</h2>
        <img src={movieData.image} alt="movie img" />
        <h4>{movieData.name}</h4>
        <b>Info:</b> {movieData.info} <br />
        <b>Decsription:</b> {movieData.desc} <br />
        <b>Rating:</b> {movieData.rating} <br />
        <br />
        <Link to="/">
          <Button className="bg-dark">Back</Button>
        </Link>
      </Container>
    </>
  );
}
