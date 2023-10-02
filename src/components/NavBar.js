import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useStore } from '..'
import { NavLink, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts'

const NavBar = observer(() => {
  const navigate = useNavigate()
  const { device, user } = useStore()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    navigate(LOGIN_ROUTE)
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="justify-content-between">
        <h3>
          <NavLink
            className="m-3 text-decoration-none text-white"
            to={MAIN_ROUTE}
          >
            M.Audio
          </NavLink>
          <NavLink
            className="m-3 text-decoration-none text-white"
            to={SHOP_ROUTE}
          >
            Магазин
          </NavLink>
        </h3>
        <div>
          {user.isAuth ? (
            <Nav className="ml-auto fs-5">
              {!device.basket[0] ? (
                <Nav.Link onClick={() => navigate(BASKET_ROUTE)}>
                  Корзина
                </Nav.Link>
              ) : (
                <Nav.Link
                  style={{ color: 'azure' }}
                  onClick={() => navigate(BASKET_ROUTE)}
                >
                  Корзина({device.basket.length})
                </Nav.Link>
              )}
              <Nav.Link onClick={() => navigate(ADMIN_ROUTE)}>
                Админ панель
              </Nav.Link>
              <Nav.Link onClick={() => logOut()}>Выйти</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link onClick={() => navigate(LOGIN_ROUTE)}>
                Авторизация
              </Nav.Link>
            </Nav>
          )}
        </div>
      </Container>
    </Navbar>
  )
})

export default NavBar
