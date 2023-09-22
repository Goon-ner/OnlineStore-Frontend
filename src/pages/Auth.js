import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { registration, login } from '../http/userAPI'
import { useStore } from '../index'

const Auth = observer(() => {
  const location = useLocation()
  const { user } = useStore()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const account = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
        console.log(data)
      }
      user.setUser(user)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3 p-3">
            {isLogin ? (
              <div>
                Нет аккаунта?
                <NavLink to={REGISTRATION_ROUTE}> Зарегистируйтесь!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт?
                <NavLink to={LOGIN_ROUTE}> Войдите!</NavLink>
              </div>
            )}
            <Button
              onClick={account}
              className="mt-3"
              variant={'outline-success'}
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
