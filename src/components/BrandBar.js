import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '..'

import Card from 'react-bootstrap/Card'

const BrandBar = observer(() => {
  const { device } = useStore()

  return (
    <div className="d-flex justify-content-start text-wrap">
      {device.brands.map((brand) => (
        <Card
          className="p-3 m-2 text-nowrap"
          style={{ cursor: 'pointer' }}
          key={brand.id}
          border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
          onClick={() => device.setSelectedBrand(brand)}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  )
})

export default BrandBar
