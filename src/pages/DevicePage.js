import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import TypeBar from '../components/TypeBar'
import star from '../assets/star.webp'
import BrandBar from '../components/BrandBar'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { fetchOneDevice, fetchBrands } from '../http/deviceAPI'
import { useStore } from '../index'

const DevicePage = () => {
  const { device } = useStore()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data))
    fetchOneDevice(id).then((data) => {
      device.setDevices(data)
      setIsLoading(false)
    })
  }, [])

  const addBasket = () => {
    device.setBasket([...device.basket, device.devices])
  }

  if (isLoading) return <Spinner />

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
                src={'http://localhost:5000/' + device.devices.img}
              />
            </Col>
            <Col md={5}>
              {device.brands.map((brand) => {
                if (brand.id === device.brandId) return <h2>{brand.name}</h2>
              })}

              <h2>{device.devices.name}</h2>
              <div className="d-flex align-items-center">
                <div>{device.devices.rating}</div>
                <Image width={20} height={20} src={star} />
              </div>
            </Col>
            <Col md={3} className="mt-5 text-center">
              <h3>Цена:</h3>
              <h2>{device.devices.price} Рублей</h2>
              <Button onClick={() => addBasket()} variant={'outline-danger'}>
                Добавить в корзину
              </Button>
            </Col>
          </div>
          <Row className="d-flex flex-column">
            <h4>Характеристики:</h4>
            {device.devices.info.map((info, index) => (
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
