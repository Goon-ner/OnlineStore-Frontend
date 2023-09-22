import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../index'

const CreateDevice = observer(({ show, onHide }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(null)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  const { device } = useStore()

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data))
    fetchTypes().then((data) => device.setTypes(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then((data) => onHide())
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить девайс
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="p-2">
            <Dropdown.Toggle className="w-100">
              {device.selectedType.name || 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 text-center ">
              {device.types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => device.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="p-2">
            <Dropdown.Toggle className="w-100">
              {device.selectedBrand.name || 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 text-center ">
              {device.brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-2"
            placeholder="Введите название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="Введите цену устройства"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control
            className="mt-2"
            placeholder="Добавьте изображение устройства"
            type="file"
            onChange={selectFile}
          />
          <hr />
          <Button variant={'outline-dark'} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, i.number)
                  }
                  placeholder="Название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, i.number)
                  }
                  placeholder="Описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant="outline-danger"
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
