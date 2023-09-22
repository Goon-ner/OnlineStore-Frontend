import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '..'
import Row from 'react-bootstrap/Row'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
  const { device } = useStore()

  return (
    <Row className="d-flex justify-content-start text-wrap">
      {device.devices.map((device) => (
        <DeviceItem
          className="p-3 m-2 text-nowrap"
          style={{ cursor: 'pointer' }}
          key={device.id}
          device={device}
        ></DeviceItem>
      ))}
    </Row>
  )
})

export default DeviceList
