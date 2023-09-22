import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor() {
    this.isAuth = false
    this.user = {}
    makeAutoObservable(this)
  }
  setIsAuth(bool) {
    this.isAuth = bool
  }
  setUser(user) {
    this.user = user
  }
  get IsAuth() {
    return this.isAuth
  }
  get User() {
    return this.user
  }
}
