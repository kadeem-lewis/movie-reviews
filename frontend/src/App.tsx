import { useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
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
            <Nav.Link to={"/movies"} as={Link}>
              Movies
            </Nav.Link>
            {user ? (
              <Button onClick={logout}>Logout User</Button>
            ) : (
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
            )}{" "}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/movies"]}>
          <MoviesList />
        </Route>

        <Route path="/movies/:id/review">
          {user ? <AddReview user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/movies/:id/">
          <Movie user={user} />
        </Route>
        <Route path="/login">
          <Login login={login} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
