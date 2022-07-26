import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";

interface IUser {
  name: string;
  password: string;
}

function App() {
  const [userDetails, setUserDetails] = useState<IUser>({
    name: "",
    password: "",
  });
  const [userName, setUserName] = useState<string>("");
  const [login, setLogin] = useState<boolean>(false);

  const userLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userName", userDetails.name);
    setUser();
  };

  const setUser = () => {
    let userName = localStorage.getItem("userName");
    setUserName(userName as string);
    userName !== "" && setLogin(true);
  };

  const checkUser = () => {
    let user = localStorage.getItem("userName");
    user === null ? setLogin(false) : setLogin(true);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <div className="main-container">
        {login === false ? (
          <Form onSubmit={userLogin}>
            <Form.Group className="form-group-container">
              <Form.Label className="form-label-customize login-form">
                Name
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                onChange={(e) =>
                  setUserDetails({
                    name: e.target.value,
                    password: userDetails.password,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="form-group-container">
              <Form.Label className="form-label-customize login-form">
                Password
              </Form.Label>
              <Form.Control
                size="sm"
                type="password"
                onChange={(e) =>
                  setUserDetails({
                    name: userDetails.name,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="sm">
              Login
            </Button>
          </Form>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}

export default App;
