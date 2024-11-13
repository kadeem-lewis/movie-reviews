import { useState, useEffect } from "react";
import {
  get,
  deleteReview as apiDeleteReview,
} from "@/services/moviesDataService.ts";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";
import { Link, useParams } from "react-router-dom";
import type { Movie } from "@/types/movies";
import { User } from "@/App";

const Movie = ({ user }: { user: User | null }) => {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();

  const getMovie = async (id: string) => {
    try {
      const movie = await get(id);
      setMovie(movie);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovie(id);
  }, [id]);

  const deleteReview = (reviewId: string, index: number) => {
    if (!user) return;
    apiDeleteReview(reviewId, user.id)
      .then(() => {
        setMovie((prevState) => {
          prevState?.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie?.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie?.title}</Card.Header>
              <Card.Body>
                <Card.Text></Card.Text>
                {user && (
                  <Link to={"/movies/" + id + "/review"}>Add Review</Link>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Reviews</h2>
            <br></br>
            {movie?.reviews.map((review, index) => {
              return (
                <Media key={review._id}>
                  <Media.Body>
                    <h5>
                      {review.name +
                        " reviewed on " +
                        new Date(Date.parse(review.date)).toDateString()}
                    </h5>
                    <p>{review.review}</p>
                    {user && user.id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={{
                              pathname: "/movies/" + id + "/review",
                              state: { currentReview: review },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteReview(review._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Media.Body>
                </Media>
              );
            })}
          </Col>
        </Row>
      </Container>

      {movie?.plot}
    </div>
  );
};

export default Movie;
