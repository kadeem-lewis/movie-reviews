import React, { useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

export type User = {
  name: string;
  id: string;
};

type ContextType = {
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function RootLayout() {
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
      <main>
        <Outlet
          context={{ login, logout, user, setUser } satisfies ContextType}
        />
      </main>
    </div>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
