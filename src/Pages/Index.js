import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
//import { Link } from "react-router-dom";
import MovieNavbar from "../Components/MovieNavbar";
import SingleMovie from "../Components/SingleMovie";

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  const [searchMovie, setSearchMovie] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchMovie && searchMovie.length > 2) {
          fetchMovies();
        } else if (searchMovie.length < 1) {
          fetchMovies();
        } else {
          setSearchErrorText("Please enter atleast 3 character");
        }
      }, 1000);

      //clean up function
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovie]);

  //async and await is used instead of promise
  const fetchMovies = async () => {
    setLoading(true);
    setSearchErrorText("");
    setIsError(false);
    //fetch resource...
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovie}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Cannot get movies data");
      setLoading(false);
      setFirstRun(false);
    }
  };
  return (
    <>
      <MovieNavbar />
      <h2>All Movies:</h2>

      <div>
        <input
          type="text"
          value={searchMovie}
          placeholder="Enter movie title"
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              ocolor: "white",
              padding: "10px",
              margin: "10px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
          >
            <div>
              {loading ? (
                <Container className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Container>
              ) : (
                <></>
              )}
            </div>
            {!loading && movies.length < 1 ? (
              <>No Movies Found !!!</>
            ) : (
              <>
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el} />
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
