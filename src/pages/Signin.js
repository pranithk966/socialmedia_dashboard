// https://www.youtube.com/watch?v=5jCTQx6TPTo&list=PLddLA9QpG2T2__tPfi6nwaL8Rf_wWQaz7&index=5

import React from "react";

// use Menu, Form, Container from semantic-ui to create signin page
import {Menu, Form, Container, Message} from "semantic-ui-react";

// react-router-dom version 6 need to use useNavigate (not useHistory)
import { useNavigate } from "react-router-dom";

// import firebase
import firebase from "../utils/firebase";

import "firebase/compat/auth"
import "firebase/compat/firestore"


function Signin() {
    // return "Hello, signing!";
    
    // constance to set default state (register or signin)
    const [activeItem, setActiveItem] = React.useState("register");

    // constance to set default state of email and password
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // error code and message
    const [errorMessage, setErrorMessage] = React.useState("");

    // usehistory from useHistory
    const navigate = useNavigate();

    // loading time for register/login
    const [isLoading, setIsLoading] = React.useState(false);

    function onSubmit() {
        setIsLoading(true);
        if (activeItem === "register") {
            // create an account
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // redirect to the homepage
                    // history.push('/');
                    // react-router-dom version 6 need to use navigate
                    navigate("/posts");

                    // loading time for register/login
                    setIsLoading(false);
                })
                // catch to handle error situation
                .catch((error) => {
                    switch(error.code) {
                            case "auth/email-already-in-use":
                                setErrorMessage("Email already in used.")
                                break;
                            case "auth/invalid-email":
                                setErrorMessage("Invalid Email format.")
                            break;
                            case "auth/weak-password":
                                setErrorMessage("Weak password.")
                            break;
                        default:
                    }
                
                    // loading time for register/login
                    setIsLoading(false);
                });
        } else if (activeItem === "signin") {
            // sign in
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    // redirect to the homepage
                    // history.push('/');
                    // react-router-dom version 6 need to use navigate
                    navigate("/posts");

                    // loading time for register/login
                    setIsLoading(false);
                })
                .catch((error) => {
                    switch(error.code) {
                            case "auth/invalid-email":
                                setErrorMessage("Invalid Email format.")
                                break;
                            case "auth/user-not-found":
                                setErrorMessage("User not existed.")
                            break;
                            case "auth/wrong-password":
                                setErrorMessage("Wrong password.")
                            break;
                        default:
                    }

                    // loading time for register/login
                    setIsLoading(false);
                });
        }
    }

    return (
        <Container>
            <Menu widths="2">
                <Menu.Item 
                    active={activeItem === "register"} 
                    onClick={() => {
                        setErrorMessage("")
                    setActiveItem("register")}}
                >
                    Register
                </Menu.Item>
                <Menu.Item 
                    active={activeItem === "signin"} 
                    onClick={() => {
                        setErrorMessage("")
                    setActiveItem("signin")}}
                >
                    Login
                </Menu.Item>
            </Menu>

            <Form onSubmit={onSubmit}>
                <Form.Input 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Please enter email"
                    ></Form.Input>
                <Form.Input 
                    label="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Please enter password"
                    type="password"
                    ></Form.Input>
                {errorMessage && <Message negative>{errorMessage}</Message>}
                <Form.Button loading={isLoading}>
                    {activeItem === "register" && "Register"}
                    {activeItem === "signin" && "Login"}
                </Form.Button> 
            </Form>
        </Container>
    );
}

export default Signin;