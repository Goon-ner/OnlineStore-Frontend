import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import TypeBar from '../components/TypeBar'
import star from '../assets/star.webp'
import BrandBar from '../components/BrandBar'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { fetchOneDevice, fetchBrands } from '../http/deviceAPI'
import { useState } from 'react'

const DevicePage = () => {
  const [brands, setBrands] = useState([])

  const [oneDevice, setOneDevice] = useState({})
  const { id } = useParams()
  useEffect(() => {
    fetchBrands().then((data) => setBrands(data))
    fetchOneDevice(id).then((data) => setOneDevice(data))
  }, [])

  console.log(oneDevice)

  return (
    <Container className="d-flex">
      <Row className="mt-2 justify-content-end">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9} className="d-block">
          <BrandBar />
          <div className="d-flex p-2">
            <Col md={4}>
              <Image
                className="w-100 p-2"
                src={'http://localhost:5000/' + oneDevice.img}
              />
            </Col>
            <Col md={5}>
              {brands.map((brand) => {
                if (brand.id === oneDevice.brandId) return <h2>{brand.name}</h2>
              })}

              <h2>{oneDevice.name}</h2>
              <div className="d-flex align-items-center">
                <div>{oneDevice.rating}</div>
                <Image width={20} height={20} src={star} />
              </div>
            </Col>
            <Col md={3} className="mt-5 text-center">
              <h3>Цена:</h3>
              <h2>{oneDevice.price} USDT</h2>
              <Button variant={'outline-danger'}>Добавить в корзину</Button>
            </Col>
          </div>
          <Row className="d-flex flex-column">
            <h4>Характеристики:</h4>
            {oneDevice.info.map((info, index) => (
              <Row
                key={info.id}
                style={{
                  background: index % 2 === 0 ? 'lightgray' : 'transparent',
                  padding: 10,
                  marginLeft: 3,
                }}
              >
                {info.title}: {info.description}
              </Row>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
export default DevicePage
