import { useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { useStore } from '../index'
import { fetchTypes, fetchBrands, fetchDevice } from '../http/deviceAPI'
import Pages from '../components/Pages'

const Shop = observer(() => {
  const { device } = useStore()

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data))
    fetchTypes().then((data) => device.setTypes(data))
    fetchDevice().then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchDevice(
      device.selectedBrand.id,
      device.selectedType.id,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedBrand, device.selectedType])

  return (
    <Container>
      <Row className="mt-2 justify-content-end">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop
