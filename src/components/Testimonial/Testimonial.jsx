import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import './testimonial.css'

const Testimonial = () => {

    const settings = {
        dots: true, 
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow:3,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            }
        ]
    }

  return (
    <Slider {...settings}>
        <div className="testimonial py-4 px-3">
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Veritatis dolore iusto maiores laborum sunt alias voluptatum 
                nihil voluptatem perferendis ea? Nisi veritatis nobis labore 
                dolorum quia ipsam illo mollitia quaerat!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Muse</h6>
                </div>
            </div>
        </div>

        <div className="testimonial py-4 px-3">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Veritatis dolore iusto maiores laborum sunt alias voluptatum 
                nihil voluptatem perferendis ea? Nisi veritatis nobis labore 
                dolorum quia ipsam illo mollitia quaerat!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Muse</h6>
                </div>
            </div>
        </div>

        <div className="testimonial py-4 px-3">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Veritatis dolore iusto maiores laborum sunt alias voluptatum 
                nihil voluptatem perferendis ea? Nisi veritatis nobis labore 
                dolorum quia ipsam illo mollitia quaerat!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Muse</h6>
                </div>
            </div>
        </div>

        <div className="testimonial py-4 px-3">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Veritatis dolore iusto maiores laborum sunt alias voluptatum 
                nihil voluptatem perferendis ea? Nisi veritatis nobis labore 
                dolorum quia ipsam illo mollitia quaerat!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Muse</h6>
                </div>
            </div>
        </div>

        

    </Slider>

   
  )
}

export default Testimonial