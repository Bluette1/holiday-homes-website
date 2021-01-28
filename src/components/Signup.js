import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', username: '', email: '', password: '', passwordConfirmation: '', loggedIn: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

    handleSignupSubmit = e => {
      e.preventDefault();
      const {
        state: {
          name, username, email, password, passwordConfirmation,
        },
      } = this;
      const { props: { login } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/api/sign_up`, {
        user: {
          name, username, email, password, password_confirmation: passwordConfirmation,
        },
      }).then(response => {
        login(response.data.data.user);
        this.setState({ loggedIn: true });
      });
    };

    render() {
      const {
        state: {
          name, username, email, password, passwordConfirmation, loggedIn,
        },
      } = this;
      return loggedIn ? <Redirect to="/" /> : (
        <div className="d-flex justify-content-center">
          <div className="signupForm p-5 m-5">
            <h1>Signup</h1>
            <form className="form" onSubmit={this.handleSignupSubmit}>
              <label htmlFor="name">
                <input
                  placeholder="Name"
                  name="name"
                  className="name"
                  onChange={this.handleChange}
                  value={name}
                />
              </label>
              {' '}
              <br />
              <label htmlFor="username">
                <input
                  placeholder="UserName"
                  name="username"
                  className="username"
                  onChange={this.handleChange}
                  value={username}
                />
              </label>
              {' '}
              <br />
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
              <br />
              <label htmlFor="passwordConfirmation">
                <input
                  placeholder="Confirm Password"
                  name="passwordConfirmation"
                  className="passwordConfirmation"
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                />
              </label>
              <br />

              <button
                type="submit"
                className="submit mb-5"
              >
                Signup
              </button>
            </form>
            <a href="/">Back</a>
          </div>
        </div>
      );
    }
}

Signup.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Signup);
