import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
export const Register = () => {
  const firstName = useRef()
  const lastName = useRef()
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()
    console.log('help')
    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value
      }

      return fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then((res) => res.json())
        .then((res) => {
          if ('token' in res) {
            localStorage.setItem('hm_token', res.token)
            history.push('/')
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <main style={{ textAlign: 'center' }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button className="button--close" onClick={(e) => passwordDialog.current.close()}>
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="JoinHive">Join the Hive!</h1>
        <fieldset className="usernamepassword">
          <div className="registerItem">
            <label htmlFor="firstName"> First Name </label>
            <input
              ref={firstName}
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              required
              autoFocus
            />
          </div>
          <div className="registerItem">
            <label htmlFor="lastName"> Last Name </label>
            <input
              ref={lastName}
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              required
            />
          </div>
          <div className="registerItem">
            <label htmlFor="inputUsername">Username</label>
            <input
              ref={username}
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div className="registerItem">
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="registerItem">
            <label htmlFor="verifyPassword"> Verify Password </label>
            <input
              ref={verifyPassword}
              type="password"
              name="verifyPassword"
              className="form-control"
              placeholder="Verify password"
              required
            />
          </div>
          <div className="registerItem">
            <label htmlFor="verifyPassword"> Email </label>
            <input ref={email} name="email" className="form-control" placeholder="email" />

            <button className="btn btn-1 btn-sep icon-send" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
      <section className="link--register">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  )
}
