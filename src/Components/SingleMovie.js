import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SingleMovie(props) {
  return (
    <>
      <Col key={props.data.id}>
        <Card style={{ width: "16rem", minHeight: "710px" }}>
          <Card.Img
            variant="top"
            src={props.data.image}
            style={{ maxWidth: "250px" }}
          />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <Link to={`/view_movie/${props.data.id}`}>
              <Button variant="dark">View Details</Button>
            </Link>
          </Card.Body>
        </Card>

        {/*<div >
          <Link to={`/view_movie/${props.data.id}`}>
            <span>
              <b>{props.data.name}</b>
            </span>
          </Link>
          <br />
          <img src={props.data.image} alt="movie img" />
          <br />
          <span>Info: {props.data.info}</span>
          <br />
          <span>Rating: {props.data.rating}</span>
        </div>
  */}
      </Col>
    </>
  );
}
