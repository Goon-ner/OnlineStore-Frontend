import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import TypeBar from '../components/TypeBar'
import star from '../assets/star.webp'
import BrandBar from '../components/BrandBar'
import Button from 'react-bootstrap/Button'
import image from '../assets/main.jpg'

import { fetchDevice, fetchBrands } from '../http/deviceAPI'
import { useState } from 'react'

const Main = () => {
  const [brands, setBrands] = useState([])

  const [device, setDevice] = useState([])

  useEffect(() => {
    fetchBrands().then((data) => setBrands(data))
    fetchDevice().then((data) => setDevice(data))
  }, [])
  console.log(device)

  return (
    <Container>
      <Image className="w-100 p-2" src={image} />
      <Row className="mt-5 text-center">
        {brands.map((brand) => {
          if (brand.id === device.rows[0].brandId)
            return (
              <h2>
                {brand.name} {device.rows[0].name}
              </h2>
            )
        })}
      </Row>
      <Row>
        <Col md={6} className="mt-5 text-center">
          <Image src={'http://localhost:5000/' + device.rows[0].img} />
        </Col>
        <Col md={6} className="mt-5 text-center p-5">
          <h3 className="m-3">Цена:</h3>
          <h2 className="m-3">{device.rows[0].price} Рублей</h2>
          <Button className="m-3" variant={'outline-danger'}>
            Добавить в корзину
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
