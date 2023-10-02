import { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { observer } from 'mobx-react-lite'
import { useStore } from '../index'

const Basket = observer(() => {
  const { device } = useStore()

  const price = device.basket.map((device) => device.price)
  const sum = price.reduce((acc, price) => acc + price, 0)

  const removeDevice = (id) => {
    device.setBasket(device.basket.filter((device) => device.id !== id))
  }

  return (
    <Container>
      <h1>Корзина:</h1>
      {!device.basket[0] ? (
        <h1 style={{ textAlign: 'center', marginTop: 20 }}>
          Добавьте товары в корзину
        </h1>
      ) : (
        device.basket.map((device) => (
          <Row key={device.id} className="d-flex">
            <hr />
            <div
              style={{ display: 'flex', justifyContent: 'space-between' }}
            ></div>
            <div style={{ display: 'flex' }}>
              <Col md={2}>
                <div>Код товара</div>
                <div>{device.id}</div>
              </Col>
              <Col md={3}>
                <div>Бренд</div>
                <div>{device.brandId}</div>
              </Col>
              <Col md={3}>
                <div>Наименование</div>
                <div>{device.name}</div>
              </Col>
              <Col md={2}>
                <div>Цена</div>
                <div>{device.price}</div>
              </Col>
              <Col md={2}>
                <Button
                  onClick={() => removeDevice(device.id)}
                  className="m-3"
                  variant={'outline-danger'}
                >
                  Удалить
                </Button>
              </Col>
            </div>
            <hr />
          </Row>
        ))
      )}
      <h2>К оплате: {sum}</h2>
    </Container>
  )
})

export default Basket
