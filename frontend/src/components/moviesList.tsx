import { useState, useEffect, useCallback } from "react";
import MovieDataService from "@/services/moviesDataService.ts";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import type { Movie } from "@/types/movies.ts";

const MoviesList = (props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  const retrieveRatings = useCallback(() => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        //start with 'All Ratings' if user doesn't specify any ratings
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const retrieveMovies = useCallback(() => {
    MovieDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [currentPage]);

  const findByTitle = useCallback(() => {
    setSearchRating("");
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  }, [searchTitle]);

  const findByRating = useCallback(() => {
    if (searchRating === "All Ratings") {
      setSearchTitle("");
      setCurrentSearchMode("findByRating");
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  }, [searchRating, retrieveMovies]);

  const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByTitle") {
      findByTitle();
    } else if (currentSearchMode === "findByRating") {
      findByRating();
    } else {
      retrieveMovies();
    }
  }, [currentSearchMode, findByRating, findByTitle, retrieveMovies]);

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, [retrieveMovies, retrieveRatings]);

  useEffect(() => {
    retrieveMovies();
    retrieveNextPage();
  }, [currentPage, retrieveMovies, retrieveNextPage]);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const find = (query: string, by: string, currentPage: number = 0) => {
    MovieDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating) => {
                    return (
                      <option
                        value={rating}
                        key={rating}
                        selected={rating === searchRating}
                      >
                        {rating}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByRating}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {/* TODO: Make everything above this it's own component */}
          {movies.map((movie) => {
            return (
              <Col key={movie._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img src={movie.poster + "/100px180"} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Rating: {movie.rated}</Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <br />
        Showing Page: {currentPage}
        <Button
          variant="link"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Get Next {entriesPerPage} Results
        </Button>
      </Container>
    </div>
  );
};

export default MoviesList;
