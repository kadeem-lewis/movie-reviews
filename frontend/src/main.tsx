import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import MoviesList, { loader as movieListLoader } from "@/components/moviesList";
import AddReview, { action as addReviewAction } from "@/components/addReview";
import Movie, {
  loader as movieLoader,
  action as movieAction,
} from "@/components/movie";
import Login from "@/components/login";
import ErrorPage from "@/errorPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MoviesList />,
        loader: movieListLoader,
      },
      {
        path: "/movies",
        element: <MoviesList />,
        loader: movieListLoader,
      },
      {
        path: "/movies/:id/review",
        element: <AddReview />,
        action: addReviewAction,
      },
      {
        path: "/movies/:id",
        element: <Movie />,
        loader: movieLoader,
        action: movieAction,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
