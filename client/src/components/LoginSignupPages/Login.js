import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AlertBox from './AlertBox';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import WatercolorBackground from "./WatercolorBackground";
import { setCurrentUser, selectCurrentUser } from '../../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  let currentUser = useSelector(selectCurrentUser);

  let handleSubmit = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setMessage("Neither username nor password may be blank.");
    }
    else {
      let user = {
        username: username,
        password: password
      }
      // attempt to log in with username and password
      axios.post(`/api/login`, user).then((data) => {
        // if successful, get all related user data
        axios.get("/api/userdata").then(({data}) => {
          // set the user data in the redux store
          if (data) {
            dispatch(setCurrentUser(data))
          }
        })
        // finally, go to '/'
        history.push("/");
      }).catch((err) => {
        if (err.message === "Request failed with status code 401") {
          setMessage("Incorrect username or password.");
        } else {
          console.log(err);
        }
      })
    }
  }

  let goToSignup = (event) => {
    event.preventDefault();
    history.push('/signup')
  }

  // sets alert box message back to blank whenever username or password fields are edited
  useEffect(() => {
    if (message !== "") {
      setMessage("");
    }
  }, [username, password])

  // const devLogin = () => {
  //   axios
  //     .post(`/api/login`, { username: "test", password: "test" })
  //     .then(() => window.location.replace("/"));
  // };

  return (<>
    <WatercolorBackground />
    <Container className='loginSignupContainer'>
      <Form>
        <Form.Row>
          <Col></Col>
          <Col>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name='username'
                onChange={(event) => setUsername(event.target.value)}
                type="text"
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Form.Row>


        <Form.Row>
          <Col></Col>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name='password'
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Form.Row>

        <Form.Row>
          <Col></Col>
          <Col>
            <Button className='signupLoginBtns' onClick={handleSubmit} variant="primary" type="submit">
              Log In
            </Button>
          </Col>
          <Col></Col>
        </Form.Row>

        <Form.Row>
          <Col></Col>
          <Col>
            <Button className='signupLoginBtns' onClick={goToSignup} variant="success" type="submit">
              Sign Up Form
            </Button>
          </Col>
          <Col></Col>
        </Form.Row>

        <Form.Row>

          <Col></Col>
          <Col>
            <AlertBox
              message={message}
            />
          </Col>
          <Col></Col>

        </Form.Row>

        {/* <Button onClick={devLogin}>
          DEV LOGIN
          </Button> */}
      </Form>
    </Container>
  </>)
}

export default Login;