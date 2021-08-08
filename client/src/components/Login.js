import React,{useRef} from 'react'
import {Container,Form,Button} from 'react-bootstrap'
import {v4 as uuidV4 } from 'uuid'
const Login = (props) => {
    const idRef=useRef()

    function handleSubmit(e){
        e.preventDefault()
        props.onIdSubmit(idRef.current.value)
    }

    function createNewId(){
        props.onIdSubmit(uuidV4())
    }
    return (
        <Container className="align-items-center d-flex" style={{
            height:'100vh'
        }}>
        <Form onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label>Enter Your Id</Form.Label>
                <Form.Control ref={idRef} type="text" required></Form.Control>
            </Form.Group>
            <Button type="submit" className="mr-2">Login</Button>
            <Button onClick={createNewId} variant="secondary">CreateNewId</Button>
        </Form>
        </Container>
    )
}

export default Login
