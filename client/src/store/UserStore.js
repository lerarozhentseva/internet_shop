import {makeAutoObservable} from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._email = {};
    makeAutoObservable(this)
    this.restoreStateFromLocalStorage();

  }

  restoreStateFromLocalStorage() {
    const state = localStorage.getItem('userStoreState');
    if (state) {
      const parsedState = JSON.parse(state);
      this._isAuth = parsedState._isAuth;
      this._user = parsedState._user;
      this._email = parsedState._email;
    }
  }

  saveStateToLocalStorage() {
    const state = JSON.stringify(this);
    localStorage.setItem('userStoreState', state);
  }

  setIsAuth(bool) {
    this._isAuth = bool
    this.saveStateToLocalStorage();
  }

  setUser(user) {
    this._user = user
    this.saveStateToLocalStorage();
  }

  setEmail(email) {
    this._email = email;
    this.saveStateToLocalStorage();
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get email() {
    return this._email;
  }
}