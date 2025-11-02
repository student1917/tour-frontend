import React, {useRef, useState, useEffect, useContext} from 'react'
import '../styles/tour-details.css'
import {Container, Row, Col, Form, ListGroup} from 'reactstrap'
import {useParams} from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import ImageSlider from '../shared/ImageSlider'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import {AuthContext} from './../context/AuthContext'
    

const TourDetails = () => {
    
    const {id} = useParams()
    const reviewMsgRef = useRef('')
    const [tourRating, setTourRating]=useState(null)   
    const {user} = useContext(AuthContext)
    //fetch data 
    const {data:tour, loading, error} = useFetch(`${BASE_URL}/tours/${id}`)

    const {photos, title, desc, price, country, reviews, city, maxGroupSize, itinerary} = tour

    const {totalRating, avgRating} = calculateAvgRating(reviews)

    const options = {day: 'numeric', month: 'long', year:'numeric'}

    const submitHandler = async e=> {
        e.preventDefault()
        const reviewText = reviewMsgRef.current.value;
        // alert(`${reviewText},${tourRating}`)


        try {

            if (!user || user==undefined || user==null)
                alert('Please sign in to review')

            const reviewObj = {
                username:user?.username,
                reviewText,
                rating:tourRating
            }
            const res = await fetch(`${BASE_URL}/review/${id}`,{
                method: 'post',
                headers: {
                    'content-type':"application/json"
                },
                credentials:"include",
                body:JSON.stringify(reviewObj)
            })

            const result = await res.json()
            if (!res.ok) 
                return alert (result.message)

            alert(result.message)
        } catch (err) {
            alert(err.message)

        }
    }

    useEffect(()=>{
        window.scrollTo(0,0)
    },[tour])

  return (
    <>
        <section>
            <Container>
                {loading && <h4 className='text-center pt-5'>Loading....</h4>}
                { error&& <h4 className='text-center pt-5'>{error}</h4>}
                {
                    !loading && !error && <Row>
                    <Col lg='8'>
                        <div className="tour__content">
                            
                        {tour?.photos?.length > 0 && <ImageSlider photos={tour.photos} />}


                            <div className="tour__info">
                                <h2>{title}</h2>
                                <div className="d-flex align-items-center gap-5">
                                <span className="tour__location d-flex align-items-center gap-1">
                                    <i className="ri-map-pin-line"></i> {city}
                                </span>
                                <span className="tour__rating d-flex align-items-center gap-1">
                                    <i className="ri-star-fill" style={{ color: "var(--secondary-color)"}}></i> {avgRating == 0 ? null : avgRating} 
                                    {totalRating == 0 ? (
                                        'Not rated'
                                    ) : (
                                        <span>({reviews?.length})</span>
                                    )}                   
                                </span>                              
                                </div>
                                <div className="tour__extra-details">
                                    <span><i className="ri-map-pin-user-fill"></i>{country?.name}</span>
                                    <span><i className="ri-money-dollar-circle-line"></i>{price}/per person</span>
                                    {/* <span><i className="ri-map-pin-time-line"></i>{distance} km</span> */}
                                    <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
                                </div>
                                <h5>Description</h5>
                                <p>{desc}</p>
                                <h5>Schedule</h5>
                                {itinerary?.map((day, index) => (
                                    <div key={day._id || index} className="itinerary__item mb-4">
                                        <h6>Day {day.day}: {day.title}</h6>
                                        <p>{day.activities?.map((activity, idx) => (                                            
                                            <div key={activity._id || idx}>   
                                            <span className='activity__title'><i className="ri-checkbox-blank-circle-fill"></i>{activity.title}</span>                                    
                                                <span className='activity__description'>{activity.description ? ` ${activity.description}` : ''}</span>
                                            </div>
                                        ))}
                                        </p>
                                    </div>

                                        ))

                                }
                            </div>
                            
                            {/* ============review start======== */}
                            <div className="tour__reviews mt-4">                              
                                <h4>Reviews ({reviews?.length} reviews)</h4> 
                                <Form onSubmit={submitHandler}>
                                    <div className="d-flex align-items-center gap-3 mb-4
                                    rating__group">
                                        {/* <span onClick={()=>setTourRating(1)}><i className="ri-star-fill"></i></span>
                                        <span onClick={()=>setTourRating(2)}><i className="ri-star-fill"></i></span>
                                        <span onClick={()=>setTourRating(3)}><i className="ri-star-fill"></i></span>
                                        <span onClick={()=>setTourRating(4)}><i className="ri-star-fill"></i></span>
                                        <span onClick={()=>setTourRating(5)}><i className="ri-star-fill"></i></span> */}
                                        {[1,2,3,4,5].map((num) => (
                                            <span key={num} onClick={()=> setTourRating(num)} 
                                                className={tourRating >= num ? 'active':''}>
                                                <i className="ri-star-fill"></i>
                                            </span>
                                        ))}
                                        </div>

                                        <div className="review__input">
                                            <input type="text" 
                                            ref={reviewMsgRef} 
                                            placeholder='share your thoughts'     
                                            required

                                            />
                                            <button className='btn primary__btn text-white'
                                            type='submit'>Submit                                                
                                            </button>
                                        </div>                              

                                </Form>

                                <ListGroup className='user__reviews'>
                                    {
                                        reviews?.map(review=> (
                                            <div key={review._id} className="review__item">
                                                <img src={avatar} alt="" />

                                                <div className="w-100">
                                                    <div className="d-flex align-items-center
                                                    justify-content-between">
                                                        <div>
                                                            <h5>{review.username}</h5>
                                                            <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                                        </div>
                                                        <span className='d-flex align-items-center'>
                                                            {review.rating}<i className="ri-star-fill"></i>
                                                        </span>
                                                    </div>
                                                    <h6>{review.reviewText}</h6>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </ListGroup>   
                            </div>      

                            {/* ============review end======== */}
                        </div>
                    </Col>

                    <Col lg='4'>
                        <Booking tour ={tour} avgRating={avgRating}/>
                    </Col>
                </Row>
                }

            </Container>
        </section>
        {/* <Newsletter/> */}
    </>
  )
}

export default TourDetails