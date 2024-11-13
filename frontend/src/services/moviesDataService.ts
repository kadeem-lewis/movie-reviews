import axios from "axios";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies?page=${page}`
    );
  }

  get(id: string) {
    return axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/id/${id}`
    );
  }
  find(query: string, by = "title", page = 0) {
    return axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/movies?${by}=${query}&page=${page}`
    );
  }

  createReview(data) {
    return axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/review`,
      data
    );
  }

  updateReview(data) {
    return axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/review`,
      data
    );
  }
  deleteReview(id: string, userId: string) {
    return axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/review`,
      { data: { review_id: id, user_id: userId } }
    );
  }

  getRatings() {
    return axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/movies/ratings`
    );
  }
}
export default new MovieDataService();
