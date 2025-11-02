import React, {useState, useContext, useEffect} from 'react'

import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import GoogleLoginButton from '../components/GoogleLoginButton'
import '../styles/login.css'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import {AuthContext} from './../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Login = () => {

    const [credentials, setCredentials] = useState({
        email:undefined,
        password:undefined,
    })

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = e=> {
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    }

    const handleClick = async e=> {
        e.preventDefault();

        dispatch({type:'LOGIN_START'})

        try {
            const res = await fetch(`${BASE_URL}/auth/login`,{
                method: 'post',
                headers: {
                    'content-type':"application/json"
                },
                credentials:"include",
                body: JSON.stringify(credentials)
            })

            const result = await res.json()
            if(!res.ok) alert(result.message)
            console.log(result.data)
            dispatch({type:'LOGIN_SUCCESS', payload:result.data})
            navigate('/')

        } catch (err) {
            dispatch({type:'LOGIN_FAILURE', payload:err.message})
        }
    }


  return (
    <section>
        <Container>
            <Row>
                <Col lg='8' className='m-auto'>
                    <div className="login__container d-flex justify-content-between">
                        <div className="login__img">
                            <img src={loginImg} alt="" />
                        </div>

                        <div className="login__form">
                            <div className="user">
                                <img src={userIcon} alt="" />
                            </div>
                            <h2>Login</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input type="email" placeholder='Email' required 
                                    id='email' onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <input type="password" placeholder='Password' required 
                                    id='password' onChange={handleChange} autoComplete="new-password" />
                                </FormGroup>
                                <Button className='btn secondary__btn auth__btn' type='Submit'>Login</Button>                                
                            </Form>
                            <div className="d-flex align-items-center gap-3 w-100 my-3">
                                <hr className="flex-grow-1 border-top border-secondary" />
                                <span className="small text-white">or Continue with</span>
                                <hr className="flex-grow-1 border-top border-secondary" />
                            </div>
                            {/* <div id="google-login-btn" className='w-100'></div> */}
                            <GoogleLoginButton
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                dispatch={dispatch}
                                navigate={navigate}
                                buttonId="google-login-btn"
                                textType="signin_with"
                                />
                            <p>Don't have an account? <Link to='/register'>Create</Link></p>

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Login