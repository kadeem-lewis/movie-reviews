import { useState } from "react";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/addReview.tsx";
import MoviesList from "./components/moviesList.tsx";
import Movie from "./components/movie.tsx";
import Login from "./components/login.tsx";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

export type User = {
  name: string;
  id: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  async function login(user: User) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link to={"/movies"} as={NavLink}>
              Movies
            </Nav.Link>
            {user ? (
              <Button onClick={logout}>Logout User</Button>
            ) : (
              <Nav.Link as={NavLink} to={"/login"}>
                Login
              </Nav.Link>
            )}{" "}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route
          path="/movies/:id/review"
          element={user ? <AddReview user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/movies/:id" element={<Movie user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </div>
  );
}

export default App;
