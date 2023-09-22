import { observer } from 'mobx-react-lite'
import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import { useStore } from '..'

const TypeBar = observer(() => {
  const { device } = useStore()

  return (
    <Col className="md-3 d-block justify-content-start">
      <ListGroup className="d-block">
        {device.types.map((type) => (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            key={type.id}
            active={type.id === device.selectedType.id}
            onClick={() => device.setSelectedType(type)}
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  )
})

export default TypeBar
