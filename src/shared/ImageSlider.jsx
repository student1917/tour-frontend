import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './img-slider.css'

const ImageSlider = ({photos}) => {   


    const single = photos.length == 1 

    return single ? (

        <img src={photos[0].url} alt="" className="tour__swiper" />

    ) : (

        <Swiper modules={[Navigation]}
        navigation loop={true} spaceBetween={10} slidesPerView={1}
        className="tour__swiper">
            {photos.map((photo, index) => (
                <SwiperSlide key={index}>
                    <img src={photo.url} alt="" />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ImageSlider