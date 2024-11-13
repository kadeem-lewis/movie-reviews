import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/addReview.tsx";
import MoviesList from "./components/moviesList.tsx";
import Movie from "./components/movie.tsx";
import Login from "./components/login.tsx";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
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
        <Route exact path={["/", "/movies"]} component={MoviesList}></Route>

        <Route
          path="/movies/:id/review"
          render={(props) => <AddReview {...props} user={user} />}
        ></Route>
        <Route
          path="/movies/:id/"
          render={(props) => <Movie {...props} user={user} />}
        ></Route>
        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
