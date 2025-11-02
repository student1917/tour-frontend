import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Card, Badge, Button, Table } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/config'
import useFetchWithCookie from '../hooks/useFetchWithCookie'
import { UserBookingTable } from '../components/UserBookingTable/UserBookingTable.jsx'
import '../styles/profile.css'

const Profile = () => {

    const {id} = useParams();
    // const token = localStorage.getItem('accessToken')
    const {data, error, loading} = useFetchWithCookie(`${BASE_URL}/users/${id}`)
    // const {data, error, loading} = useFetch(`${BASE_URL}/users/${id}`)
    const user = data?.data

    const [bookings, setBookings] = useState([])
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 5 })

        // Fetch booking
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const res = await fetch(`${BASE_URL}/booking/user/${id}?page=${pagination.pageIndex}&limit=${pagination.pageSize}`, {
            credentials: 'include'
          })
          const json = await res.json()
          if (json.success) {
            setBookings(json.data)
            setTotal(json.total)
          }
        } catch (err) {
          console.error(err)
        }
      }

      if (id) fetchBookings()
    }, [id, pagination])

  const handlePaginationChange = (newPagination) => {
    setPagination(newPagination)
  }
  
    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

  return (
    <Container className='profile__container'>
        <Row className='d-flex justify-content-center mt-5'>
            <Col lg='4' className='border profile__info'>
              <div className="profile__container">
                <img src={user?.banner || "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg"} alt="" className='profile__banner'/>
                <img src={user?.photo || "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg"} alt="" className='profile__avatar' />
                <h4 className='username'>{user?.username}</h4>
              </div>
              <div className="d-flex align-items-center gap-3 w-95 mx-auto mb-3">
                <i className="ri-mail-line text-secondary bg-light rounded-circle p-2 border"></i>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1">Email</h6>
                    <button className="btn btn-sm btn-light text-muted rounded-pill px-2">Chỉnh sửa</button>
                  </div>
                  <div className="d-flex user__email">{user.email}</div>
                </div>
              </div>
            </Col>
            <Col lg='7' className='border booking__details'>
              <h3 className='my-4'>Your Bookings</h3>
                <UserBookingTable
                  data={bookings}
                  total={total}
                  pagination={pagination}
                  onPaginationChange={handlePaginationChange}
                />
            /</Col>
          </Row>
    </Container>
  )
}

export default Profile