import { observer } from 'mobx-react-lite'
import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

import { useStore } from '../index'

const Pages = observer(() => {
  const { device } = useStore()
  const pageCount = Math.ceil(device.totalCount / device.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <Pagination>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  )
})

export default Pages
