import { useState } from "react";
import { updateReview, createReview } from "@/services/moviesDataService.ts";
import { Link, useParams, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { User } from "@/App";

const AddReview = ({ user }: { user: User }) => {
  let editing = false;
  let initialReviewState = "";
  const { id } = useParams();
  const location = useLocation();

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = async () => {
    const data = {
      review: review,
      name: user.name,
      user_id: user.id,
      movie_id: id,
    };
    if (editing) {
      // get existing review id
      Object.assign(data, {
        review_id: location.state.currentReview._id,
      });
      try {
        await updateReview(data);
        setSubmitted(true);
      } catch (error: unknown) {
        console.error(error);
      }
    } else {
      try {
        await createReview(data);
        setSubmitted(true);
      } catch (error: unknown) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={"/movies/" + id}>Back to Movie</Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={onChangeReview}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveReview}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddReview;
