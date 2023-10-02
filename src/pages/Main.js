import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import image from '../assets/main.jpg'
import { useStore } from '../index'
import { fetchDevice, fetchBrands } from '../http/deviceAPI'
import { useState } from 'react'

const Main = () => {
  const { device } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevice().then((data) => {
      device.setDevices(data.rows)
      setIsLoading(false)
    })
  }, [])

  const addBasket = () => {
    device.setBasket([...device.basket, device.devices[0]])
  }

  if (isLoading) return <Spinner />

  return (
    <Container>
      <Image className="w-100 p-2" src={image} />
      <Row className="mt-5 text-center">
        {device.brands.map((brand) => {
          if (brand.id === device.devices[0].brandId)
            return (
              <h2 key={device.id}>
                {brand.name} {device.devices[0].name}
              </h2>
            )
        })}
      </Row>
      <Row>
        <Col md={6} className="mt-5 text-center">
          <Image src={'http://localhost:5000/' + device.devices[0].img} />
        </Col>
        <Col md={6} className="mt-5 text-center p-5">
          <h3 className="m-3">Цена:</h3>
          <h2 className="m-3">{device.devices[0].price} Рублей</h2>
          <Button
            onClick={() => addBasket()}
            className="m-3"
            variant={'outline-danger'}
          >
            Добавить в корзину
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
