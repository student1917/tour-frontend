import React, {useRef, useEffect, useContext} from 'react'
import {Container, Row, Button} from 'reactstrap'
import {NavLink, Link, useNavigate, useLocation} from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './header.css'
import {AuthContext} from './../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'





const nav__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path: '/about',
    display:'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
]

const Header = () => {

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const {user, dispatch} = useContext(AuthContext)
  const {isDark, setIsDark} = useTheme()
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home' 
  || location.pathname === '/tours' || location.pathname == '/tours/search';



  const logout = ()=> {
    dispatch({type:'LOGOUT'})
    navigate('/')
  }


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const header = headerRef.current;
  
      if (!header) return;
  
      if (isHome) {
        // Nếu đang ở trang home
        if (scrollTop < 80) {
          header.classList.add('transparent');       // Trên cùng → trong suốt
          header.classList.remove('sticky__header'); // Không cần sticky
        } else {
          header.classList.remove('transparent');    // Kéo xuống → có nền
          header.classList.add('sticky__header');    // Cho hiệu ứng nền cố định
        }
      } else {
        // Trang khác → luôn có nền
        header.classList.remove('transparent');
        header.classList.add('sticky__header');
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // chạy lần đầu
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

  return <header className='header' ref={headerRef}>
    <Container>
      <Row>
        <div className='nav__wrapper d-flex align-items-center 
        justify-content-between'>
          {/* =======logo=======*/}
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          {/* =======logo-end=======*/}
          {/* =======menu start=======*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu d-flex align-items-center gap-5">
              {
                nav__links.map((item,index)=>(
                  <li className="nav__item" key={index}>
                    <NavLink 
                      to={item.path} 
                      className={navClass=> 
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
           {/* */}
          <div className="theme__switch d-flex align-items-center gap-5">
            <input type="checkbox" id="check" className="switch" checked={isDark} onChange={() => setIsDark(!isDark)} />            
            <label htmlFor="check" className="label"></label>
          </div>

          {/*  */}
          {/* =======menu end=======*/}
          <div className="nav__right d-flex align-items-center gap-4">
            <div className="nav__btns d-flex align-items-center gap-4">

              {
                user? <>
                <h5 className="mb-0">Hi, {user.username}</h5>
                <Button className="btn btn-dark" onClick={logout}>Logout</Button>
          
                </> : <>
                  <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                  <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                </>
              }

              
            </div>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>


          </div>
          

        </div>
      </Row>
    </Container>
  </header>
}

export default Header;