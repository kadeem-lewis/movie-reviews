import { useState } from "react";
import {
  getRatings,
  getAll,
  find as find,
} from "@/services/moviesDataService.ts";
import {
  Link,
  useSearchParams,
  Form as RouterForm,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;

  const title = searchParams.get("title");
  const rating = searchParams.get("rating");
  const page = Number(searchParams.get("page")) || 0;

  const getMovies = async () => {
    if (title) {
      return find(title, "title", page);
    } else if (rating) {
      return find(rating, "rated", page);
    } else {
      return getAll(page);
    }
  };

  const [ratings, movies] = await Promise.all([getRatings(), getMovies()]);
  return { movies, ratings };
}

export default function MoviesList() {
  const { movies, ratings } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [entriesPerPage] = useState(movies.entries_per_page);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <RouterForm>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  name="title"
                  defaultValue={searchParams.get("title") || ""}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </RouterForm>
          </Col>
          <Col>
            <RouterForm>
              <Form.Group>
                <Form.Control as="select" name="rating">
                  {ratings.map((rating) => {
                    return (
                      <option
                        value={rating}
                        key={rating}
                        selected={rating === searchParams.get("rating")}
                      >
                        {rating}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </RouterForm>
          </Col>
        </Row>
        <Row>
          {/* TODO: Make everything above this it's own component */}
          {movies.movies.map((movie) => {
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
        Showing Page: {searchParams.get("page") || 0}
        <Button
          variant="link"
          onClick={() => {
            searchParams.set(
              "page",
              (Number(searchParams.get("page") ?? 0) + 1).toString()
            );
            setSearchParams(searchParams);
          }}
        >
          Get Next {entriesPerPage} Results
        </Button>
      </Container>
    </div>
  );
}
