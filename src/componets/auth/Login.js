import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import LogoImg from '../../images/HiveMind.PNG'
import './Login.css'

export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()

    return fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if ('valid' in res && res.valid && 'token' in res) {
          localStorage.setItem('hm_token', res.token)
          history.push('/events')
        } else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button className="button--close" onClick={(e) => invalidDialog.current.close()}>
          Close
        </button>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <img class="logo" src={LogoImg} alt="" />
          <h2 className="signin">Please sign in</h2>

          <fieldset className="usernamepassword">
            <label htmlFor="inputUsername"> Username </label>
            <input
              ref={username}
              type="username"
              id="username"
              className="form-control"
              placeholder="Username"
              required
              autoFocus
            />
            <div className="password">
              <label htmlFor="inputPassword"> Password </label>
              <input
                ref={password}
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
          </fieldset>

          <button className="btnsignin" type="submit">
            Sign In
          </button>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
