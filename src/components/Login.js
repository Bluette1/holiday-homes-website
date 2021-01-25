import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

const Login = ({ login }) => {
  const [email, setEmail] = useStateIfMounted('');
  const [password, setPassword] = useStateIfMounted('');
  const [loggedIn, setLoggedin] = useStateIfMounted(false);

  const handleChange = ({ target: { value } }, setData) => {
    setData(value);
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
    });
  };

  return loggedIn ? <Redirect to="/" /> : (
    <div className="loginForm">
      <h1>Login</h1>
      <form className="form" onSubmit={handleLoginSubmit}>
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
            name="password"
            className="password"
            onChange={e => handleChange(e, setPassword)}
            value={password}
          />
        </label>
        {' '}
        <br />
        <button
          type="submit"
          className="submit"
        >
          Login
        </button>
      </form>
      <a href="/signup">
        <button type="submit" className="submit">
          Signup
        </button>
      </a>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
