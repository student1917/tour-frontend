import React from 'react'
import './common-section.css'

import {Container, Row, Col} from 'reactstrap'

const CommonSection = ({title, children}) => {
  return (
    <section className='common__section'>
        <Container>
            <Row>
              <Col lg='12'>
                <h1>{title}</h1>
                {children}
              </Col>                 
            </Row>
        </Container>
    </section>
  )
}

export default CommonSection