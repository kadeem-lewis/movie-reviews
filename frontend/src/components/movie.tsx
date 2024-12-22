import { get, deleteReview } from "@/services/moviesDataService.ts";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";
import {
  ActionFunctionArgs,
  Link,
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
  useParams,
} from "react-router-dom";
import type { Movie } from "@/types/movies";
import { useUser } from "@/layouts/RootLayout";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) return;
  const movie = await get(params.id);
  return { movie };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { userId, reviewId } = Object.fromEntries(formData);
  //TODO: look to see if I need better error handling here
  const response = await deleteReview(String(reviewId), String(userId));
  return response;
}

export default function Movie() {
  const { id } = useParams();

  const { user } = useUser();

  const { movie } = useLoaderData();

  const fetcher = useFetcher();

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
            {movie?.reviews.map((review) => {
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
                            to={`/movies/${id}/review`}
                            state={{ currentReview: review }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <fetcher.Form method="DELETE">
                            <input
                              type="hidden"
                              name="reviewId"
                              value={review._id}
                            />
                            <input
                              type="hidden"
                              name="userId"
                              value={user.id}
                            />
                            <Button variant="link" type="submit">
                              Delete
                            </Button>
                          </fetcher.Form>
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
}
