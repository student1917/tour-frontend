import React, {useState, useContext} from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from './../../context/AuthContext'
import { BASE_URL } from './../../utils/config'

const Booking = ({tour, avgRating}) => {
    const{price, reviews, title} = tour
    const navigate =useNavigate()
    
    const {user} = useContext(AuthContext)
    const { tourId } = useParams()

    const [booking, setBooking] = useState({
        userId: user && user._id,
        tourId,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt:''
    })


    const handleChange = e=> {
        setBooking(prev=>({...prev, [e.target.id]:e.target.value}))
    }

    const serviceFee = 10
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

    const [selectedPayment, setSelectedPayment] = useState('cash')

    // //send data to server
    // const handleClick = async e => {
    //     e.preventDefault();
    //     console.log(booking)
    //     try {
    //         if(!user || user==undefined || user==null)
    //             return alert('Please sign in to book tour')
                
    //         const res = await fetch(`${BASE_URL}/booking`,{
    //             method: 'post',
    //             headers: {
    //                 'content-type':"application/json"
    //             },
    //             credentials:"include",
    //             body:JSON.stringify(booking)
    //         }) 

    //         const result = await res.json()
           
    //         if (!res.ok) 
    //             return alert (result.message)

    //         // navigate("/thank-you")

    //     } catch (err) {
    //         alert(err.message)
    //         return null
    //     }
       
    // }

    const submitBooking = async () => {
        try {
        const res = await fetch(`${BASE_URL}/booking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(booking)
        });
        const result = await res.json()
        if (!res.ok) throw new Error(result.message)
        return result.data._id; 
        } catch (err) {
        console.error(err)
        return null
        }
    }

    const handleConfirm = async e => {
        e.preventDefault();

        if (!selectedPayment) return alert('Please select payment method');

        const bookingId = await submitBooking();
        if (!bookingId) return alert('Failed to create booking');

        try {
        if (selectedPayment === 'cash') {
            const res = await fetch(`${BASE_URL}/payment/payWithCash`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId, amount: totalAmount })
            });
            const result = await res.json();
            if (res.ok) {
            alert('Successful!');
            navigate('/thank-you');
            } else alert(result.message);
        }

        if (selectedPayment === 'momo') {
            const res = await fetch(`${BASE_URL}/payment/momo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId, amount: totalAmount })
            });
            const result = await res.json();
            if (res.ok) window.location.href = result.payUrl;
            else alert(result.message);
        }
        } catch (err) {
        alert('Payment error: ' + err.message);
        }
    };



  return (
    <div className="booking">
        <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>${price}<span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
                <i className="ri-star-fill" style={{ color: "var(--secondary-color)"}}></i> {avgRating == 0 ? null : avgRating} 
                ({reviews?.length})
            </span>            
        </div>
        {/* ==========booking form start============ */}
        <div className="booking__form" onSubmit={handleConfirm}>
            <h5>Information</h5>
            <Form className='booking__info-form'>
                <FormGroup>
                    <input type="text" placeholder='Full Name' id='fullName'
                    required onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <input type="number" placeholder='Phone' id='phone'
                    required onChange={handleChange} />
                </FormGroup>
                <FormGroup className='d-flex align-items-center gap-3'>
                    <input type="date" placeholder='' id='bookAt'
                    required onChange={handleChange} />
                    <input type="number" placeholder='GroupSize' id='guestSize'
                    required onChange={handleChange} />                 
                    
                </FormGroup>

            </Form>
        </div>
        {/* ==========booking form end============ */}
        {/* ==========booking bottom start============ */}
        <div className="booking__bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>${price} <i className="ri-close-line"></i> 1 person</h5>
                    <span>${price}</span>
                </ListGroupItem>
                <ListGroupItem className='border-0 px-0'>
                    <h5>Service charge</h5>
                    <span>${serviceFee}</span>
                </ListGroupItem>
                <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span>${totalAmount}</span>
                </ListGroupItem>
            </ListGroup>
            {/*  */}
            <ListGroup flush className="d-flex flex-column gap-3">
                <ListGroupItem tag="label" className={`d-flex gap-3 p-3 border rounded cursor-pointer ${selectedPayment === 'cash' ? '' : ''}`}>
                    <input type="radio" name="payment" value="cash" checked={selectedPayment === 'cash'} onChange={() => setSelectedPayment('cash')} className="form-check-input mt-2" />
                    <div>
                        <h6>Pay for Cash</h6>
                        <p className="mb-0 text-muted small">Pay for cash</p>
                    </div>
                </ListGroupItem>

                <ListGroupItem tag="label" className={`d-flex gap-3 p-3 border rounded cursor-pointer ${selectedPayment === 'momo' ? '' : ''}`}>
                    <input type="radio" name="payment" value="momo" checked={selectedPayment === 'momo'} onChange={() => setSelectedPayment('momo')} className="form-check-input mt-2" />
                    <div>
                        <h6> Momo</h6>
                        <p className="mb-0 text-muted small">Use a credit or debit card to pay with automatic payments</p>
                    </div>
                </ListGroupItem>
                
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleConfirm}>Book Now</Button>
        </div>
        {/* ==========booking bottom end============ */}
    </div>  
    
  )
}
export default Booking