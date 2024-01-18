import React,  { useState } from 'react'
import { Button, Form,  Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../Style/Signup.css"
import { useSignupMutation } from '../service/appApi'



function Signup() {

  // Set up local states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOwner, setIsOwner] = useState(false)

 // hook from appApi
 const [signup, {error, isLoading, isError}]=useSignupMutation();

 // handle signup action
 function handleSignup(e) {
  e.preventDefault();;
  signup({name, email, password, isOwner})  // send data as an object to appApi
 }


  return (
    <div className='signup-container'>
      <div className='signup-form'>
        <Form onSubmit={handleSignup}>
          <h1>Create a new account</h1>

          {isError && <Alert variant="danger">{error.data}</Alert>} 
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control className='info-input' type='text' placeholder='Enter your name' value={name} required onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control className='info-input' type='email' placeholder='Enter your email' value={email} required onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control className='info-input' type='password' placeholder='Enter your password' value={password} required onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I'm here to sell" checked={isOwner} onChange={(e) => setIsOwner(e.target.checked)} />
          </Form.Group>

          <Form.Group className='mt-5'>
            <Button type='submit' className='signup-button' disabled={isLoading}>Signup</Button>
          </Form.Group>

          <p className='pt-3 text-center'>
            Already have an account <Link to="/login">Login here</Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Signup