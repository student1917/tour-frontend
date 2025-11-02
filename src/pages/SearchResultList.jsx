import React, {useState, useEffect} from 'react'
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from '../shared/SearchBar';
import { useLocation } from 'react-router-dom';
import TourCard from './../shared/TourCard';
import Newsletter from './../shared/Newsletter';
import { BASE_URL } from '../utils/config';

const SearchResultList = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search);

    const country = params.get('country');
    const subregion = params.get('subregion');
    const maxGroupSize = params.get('maxGroupSize');

    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?country=${country || ''}&subregion=${subregion || ''}&maxGroupSize=${maxGroupSize || ''}`);
                const result = await res.json();
                setData(result.data || []);
            } catch (err) {
                console.error(err);
                setData([]);
            }
        };

        fetchData();
    }, [country, subregion, maxGroupSize]);
        
  return (
    <>
    <CommonSection title={'Tour Search Result'}/>
    <div className="w-50 justify-content-center align-items-center mx-auto mb-5">
        <SearchBar/>
    </div>
        <section>
            <Container>
                <Row>
                    {
                        data.length == 0? (
                        <h4 className='text-center'>No tour found</h4>
                        ) : (
                        data?.map(tour => (
                           <Col lg = '3' className='mb-4' key={tour._id}>                        
                                <TourCard tour={tour} />
                           </Col> 
                        )))
                    }
                </Row>
            </Container>
        </section>
        {/* <Newsletter/> */}
    </>
  )
}

export default SearchResultList