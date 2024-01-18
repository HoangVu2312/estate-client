import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../Style/Signup.css"
import { useLoginMutation } from '../service/appApi'

function Login() {

  // Set up local states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   // hook from appApi
  const [login, {error, isLoading, isError}]=useLoginMutation();

 // handle signup action
 function handleLogin(e) {
  e.preventDefault();;
  login({ email, password})  // send data as an object to appApi
 }


  return (
    <div className='login-container'>
      <div className='login-form'>
        <Form onSubmit={handleLogin}>
          <h1>Login to your account</h1>

          {isError && <Alert variant="danger">{error.data}</Alert>}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control className='info-input' type='email' placeholder='Enter your email' value={email} required onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control className='info-input' type='password' placeholder='Enter your password' value={password} required onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className='mt-5'>
            <Button type='submit' className='login-button'disabled={isLoading}>Login</Button>
          </Form.Group>

          <p className='pt-3 text-center'>
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Login