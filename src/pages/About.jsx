import React, { useEffect, useState } from 'react'
import '../styles/about.css'
import { Container, Row, Col } from 'reactstrap'
import img01 from '../assets/images/about-1.jpg'
import CountUp from 'react-countup'



const About = () => {
  return <>    
    
    <section className='intro'>
        <Container>
            <Row>
                <Col lg = '6'>
                <div className="sub__card d-flex flex-column align-items-start justify-content-center">
                    <h1>It's time to travel the word</h1>
                    <p>At TravelWorld, we believe that every journey is a chance to create unforgettable memories. 
                        With over 15 years of experience, we've helped thousands of travelers explore breathtaking destinations,
                        discover new cultures, and enjoy stress-free adventures.</p>
                </div>
                </Col>
                <Col lg = '6'>
                    <div className="img__container">
                        <img src={img01} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    
    <section>
        <Container>
            <Row>
                <Col lg ='12'>
                    <div className="slogan">
                    <p>Whether you're planning a relaxing beach holiday, a cultural escape, or an adventure-filled tour, 
                    our passionate team is here to make it happen. 
                    We take care of every detail — from transportation and accommodation to personalized itineraries
                    — so all you have to do is enjoy the ride.
                    </p>                    
                    </div>                  

                    
                </Col>
            </Row>
        </Container>
    </section>

    <section>
        <Container>
            <Row className='d-flex align-items-center justify-content-center'>
                <Col lg="2" md="3" sm="6">
                    <div className="counter__box">
                    <span>12k+</span>
                    <h6>Successful trip</h6>
                </div>
                </Col>
                <Col lg="2" md="3" sm="6">
                    <div className="counter__box">
                    <span>2k+</span>
                    <h6>Regular clients</h6>
                </div>
                </Col>
                <Col lg="2" md="3" sm="6">
                    <div className="counter__box">
                    <span>15</span>
                    <h6>Years experience</h6>
                </div>
                </Col>
                <Col lg="2" md="3" sm="6">
                    <div className="counter__box">
                    <span>10k+</span>
                    <h6>Customer reviews</h6>
                </div>
                </Col>
            </Row>
        </Container>
    </section>

    <section>
        <Container>
            <Row>
                <Col lg = '6'>
                    <div className="img__container">
                        <img src={img01} alt="" />
                    </div>
                </Col>
                <Col lg = '6'>
                <div className="sub__card d-flex flex-column align-items-start justify-content-center">
                    <h1>Our Team</h1>
                    <p>Our team is made up of more than just travel planners — 
                        we are a community of passionate individuals who live
                        and breathe travel. From experienced tour guides who 
                        know every hidden gem, to our attentive customer 
                        support team who ensure your journey runs smoothly, 
                        every member of TravelWorld plays an important role.</p>
                    <p>
                        We come from different backgrounds, cultures, and countries,
                        but we all share one mission: to create meaningful, joyful,
                        and unforgettable travel experiences for you.
                    </p>
                    <p>
                        With deep knowledge of destinations and a true understanding of
                         traveler needs, our people don’t just organize trips — 
                         they craft journeys that leave lasting memories.
                    </p>
                </div>
                </Col>

            </Row>
        </Container>
    </section>     

    <div className='slogan d-flex align-items-center justify-content-center'>
        <h2>🌟 Your journey, your story — we just help you write it.</h2>       
    </div>
    
              

    <section>
        <Container>
            <Row>
                <Col lg = '6'>
                <div className="sub__card d-flex flex-column align-items-start justify-content-center">
                    <h1>Our Commitment </h1>
                    <p>At TravelWorld, your satisfaction, safety, and joy are at the heart of everything we do. 
                        We are committed not only to delivering great trips, but to creating experiences that 
                        are personal, seamless, and truly unforgettable.</p>
                    <p>✔️ Flexible and transparent itineraries – so you always know what to expect.</p>
                    <p>✔️ 24/7 real-time support – because peace of mind matters.</p>    
                    <p>✔️ No hidden costs – just honest pricing and clear value.</p>  
                    <p>✔️ Carefully selected partners – for quality in every detail.</p> 
                    <p>✔️ Continuous improvement – we listen, we learn, and we grow with every journey.</p>                     
                    

                </div>
                </Col>
                <Col lg = '6'>
                    <div className="img__container">
                        <img src={img01} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section> 



  </>
}

export default About