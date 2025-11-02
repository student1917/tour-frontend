import React, {useRef, useState, useEffect} from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {


    const {data:countries} = useFetch(`${BASE_URL}/tours/search/getTourCountries`)


    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedSubregion, setSelectedSubregion] = useState('');

    const filteredSubregions = selectedCountry
        ? countries
        .filter(c => c.name === selectedCountry)
        .map(c => c.subregion)
        : Array.from(new Set(countries.map(c => c.subregion)));

    const filteredCountries = selectedSubregion
        ? countries.filter(c => c.subregion === selectedSubregion)
        : countries;

    
    useEffect(() => {
        if (selectedCountry) {
        const firstSubregion = filteredSubregions[0] || ''
        setSelectedSubregion(firstSubregion)
        } else {
        setSelectedSubregion('')
        }
    }, [selectedCountry, countries])

    const maxGroupSizeRef = useRef(0)
    const navigate = useNavigate()

    const searchHandler = async() => {
        const maxGroupSize = maxGroupSizeRef.current.value 
        navigate(`/tours/search?country=${selectedCountry}&subregion=${selectedSubregion}&maxGroupSize=${maxGroupSize}`);
    }


  return <Col lg='12'>
    <div className='search__bar'>
        <Form className='d-flex aligin-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                    <h6>Country</h6>
                    {/* <input type="text" placeholder='where are you going?' ref={locationRef}/> */}
                    <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className='dropdown-select'>
                        <option value="">Select Country</option>
                        {filteredCountries.map(c => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                <span><i className="ri-map-pin-time-line"></i></span>
                <div>
                    <h6>Subregion</h6>
                    {/* <input type="number" placeholder='Distance km' ref={distanceRef} /> */}
                    <select value={selectedSubregion} onChange={e => setSelectedSubregion(e.target.value)} className='dropdown-select'>
                        <option value="">Select Subregion</option>
                        {filteredSubregions.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                <span><i className="ri-group-line"></i></span>
                <div>
                    <h6>Max people</h6>
                    <input type="number" placeholder='Max Group Size' ref={maxGroupSizeRef}/>
                </div>
            </FormGroup>

            <span className='search__icon' type='submit' onClick={searchHandler}>
                <i className="ri-search-line"></i>
            </span>

        </Form>
    </div>
  </Col>
    
  
}

export default SearchBar