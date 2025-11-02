import React, {useState, useContext} from 'react'

import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/login.css'
import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'
import {AuthContext} from './../context/AuthContext'
import { BASE_URL } from '../utils/config'
import OtpPopup from '../pop-up/OtpPopup'
import GoogleLoginButton from '../components/GoogleLoginButton'

const Register = () => {

    const [showOtp, setShowOtp] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    
    const [credentials, setCredentials] = useState({
        username: undefined,
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
        if (loading) return
        setLoading(true)

        try {
            const res = await fetch(`${BASE_URL}/auth/register`,{
                method: 'post',
                headers: {
                    'content-type':"application/json"
                },
                body: JSON.stringify(credentials)
            })

            const result = await res.json()
            if(!res.ok) alert(result.message)
            // dispatch({type:'REGISTER_SUCCESS'})
            // navigate('/login')
                if (result.success) {
                    setShowOtp(true); 
                    setEmail(credentials.email); 
                }

        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <section>
        <Container>
            <Row>
                <Col lg='8' className='m-auto'>
                    <div className="login__container d-flex justify-content-between">
                        <div className="login__img">
                            <img src={registerImg} alt="" />
                        </div>

                        <div className="login__form">
                            <div className="user">
                                <img src={userIcon} alt="" />
                            </div>
                            <h2>Register</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input type="text" placeholder='Username' required 
                                    id='username' onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <input type="email" placeholder='Email' required 
                                    id='email' onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <input type="text" placeholder='Password' required 
                                    id='password' onChange={handleChange}/>
                                </FormGroup>
                                <Button className='btn secondary__btn auth__btn' type='Submit'>Create Account</Button>    
                                <OtpPopup
                                    show={showOtp}
                                    onClose={() => setShowOtp(false)}
                                    email={email}
                                />                           
                            </Form>
                            <div className="d-flex align-items-center gap-3 w-100 my-3">
                                <hr className="flex-grow-1 border-top border-secondary" />
                                <span className="small text-white">or Continue with</span>
                                <hr className="flex-grow-1 border-top border-secondary" />
                            </div>
{/* 
                            <div className="d-flex align-items-center justify-content-center">
                                <button onClick={handleGoogleLogin}
                                    className='d-flex align-items-center justify-content-center gap-2 auth__btn login__with-google w-100 py-2'>
                                    <img src={icGG} alt="" />
                                    Google
                                </button>
                            </div> */}
                            <GoogleLoginButton
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                dispatch={dispatch}
                                navigate={navigate}
                                buttonId="google-login-btn"
                                textType="signup_with"
                                />
                            <p>Already have an account? <Link to='/login'>Login</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Register