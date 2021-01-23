import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', loggedIn: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

    handleLoginSubmit = e => {
      e.preventDefault();
      const {
        state: {
          email, password,
        },
      } = this;
      const { props: { login } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/api/sign_in`, {
        user:
          {
            email, password,
          },
      }).then(response => {
        login(response.data.data.user);
        this.setState({ loggedIn: true });
      });
    };

    render() {
      const {
        state: {
          email, password, loggedIn,
        },
      } = this;
      return loggedIn ? <Redirect to="/" /> : (
        <div className="loginForm">
          <h1>Login</h1>
          <form className="form" onSubmit={this.handleLoginSubmit}>
            <label htmlFor="email">
              <input
                placeholder="Email"
                name="email"
                className="email"
                onChange={this.handleChange}
                value={email}
              />
            </label>
            <br />

            <label htmlFor="password">
              <input
                placeholder="Password"
                name="password"
                className="password"
                onChange={this.handleChange}
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
    }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
