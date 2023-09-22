import React from 'react'
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import star from '../assets/star.webp'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({ device }) => {
  const navigate = useNavigate()
  return (
    <Col md={4} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card
        style={{ width: 300, cursor: 'pointer' }}
        border={'light'}
        className="p-3 m-2"
      >
        <Image
          alt={device.id}
          width={250}
          height={250}
          src={'http://localhost:5000/' + device.img}
        />
        <div className="d-flex justify-content-between align-items-center">
          <div>{device.name}</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <img alt={'star'} width={20} height={20} src={star} />
          </div>
        </div>
        <div> Цена: {device.price} р.</div>
      </Card>
    </Col>
  )
}

export default DeviceItem
