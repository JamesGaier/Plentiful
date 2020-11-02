import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
interface Props {
    type: string
}

const Auth = (props: Props) => {
    const { type } = props;
    console.log(type);

    return (
        <div className="w-25 m-auto mt-md-4">
            <h1 className="mb-3 text-center">{type}</h1>
            <Form>
                {
                    props.type === "Sign Up" &&
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                }
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-3" block>
                    Submit
                </Button>
                {
                    props.type === "Log In" &&
                    <Link to="/signup">Don't have an account? Register</Link>
                }
            </Form>
        </div>
    );
}

export default Auth
