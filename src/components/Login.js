import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';
import '../css/Login.css';

const Login = ({ login }) => {
  const [email, setEmail] = useStateIfMounted('');
  const [password, setPassword] = useStateIfMounted('');
  const [loggedIn, setLoggedin] = useStateIfMounted(false);
  const [err, setErr] = useStateIfMounted(false);

  const handleChange = ({ target: { value } }, setData) => {
    setData(value);
  };

  const toggleFn = () => {
    const psswdInput = document.getElementById('passwordInput');
    if (psswdInput.type === 'password') {
      psswdInput.type = 'text';
    } else {
      psswdInput.type = 'password';
    }
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    axios.post(`${httpProtocol}://${host}:${port}/api/sign_in`, {
      user:
          {
            email, password,
          },
    }).then(response => {
      login(response.data.data.user);
      setLoggedin(true);
    }).catch(() => {
      setErr(true);
    });
  };
  const loginDisplay = (
    <div className="wrapper row d-flex justify-content-center">
      <div className="col-12">
        <div className="loginForm p-5 m-5 d-flex flex-column align-items-center">
          {err ? <p className="text-danger">Wrong email or password</p> : null }
          <h4 className="pb-4">
            Sign in &nbsp;&nbsp;
            <sup className="h6 d-none d-lg-inline-flex text-info"><small>Holiday Homes</small></sup>
          </h4>
          <p className="text-center">Hello there! Sign in and start managing your system</p>
          <form className="form d-flex flex-column align-items-center" onSubmit={handleLoginSubmit}>
            <label htmlFor="email">
              <input
                placeholder="Email"
                name="email"
                className="email"
                onChange={e => handleChange(e, setEmail)}
                value={email}
              />
            </label>
            <br />

            <label htmlFor="password">
              <input
                placeholder="Password"
                id="passwordInput"
                type="password"
                name="password"
                className="password"
                onChange={e => handleChange(e, setPassword)}
                value={password}
              />
            </label>
            {' '}
            <br />
            <label htmlFor="show-password">
              Show Password
              <input className="m-1" type="checkbox" onClick={toggleFn} />
            </label>
            <br />
            <button
              type="submit"
              className="submit btn btn-primary pl-4 pr-4"
            >
              Login
            </button>
          </form>
          <a href="/signup">
            <button type="submit" className="submit mt-5 btn btn-primary pl-4 pr-4">
              Signup
            </button>
          </a>
        </div>
      </div>
    </div>
  );

  return loggedIn ? <Redirect to="/" /> : loginDisplay;
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
