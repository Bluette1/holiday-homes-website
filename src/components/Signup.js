import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';
import '../css/Signup.css';

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
      const toggleFn = (e, id) => {
        const psswdInput = document.getElementById(id);
        if (psswdInput.type === 'password') {
          psswdInput.type = 'text';
        } else {
          psswdInput.type = 'password';
        }
      };
      return loggedIn ? <Redirect to="/" /> : (
        <div className="wrapper row d-flex justify-content-center">
          <div className="col-12">
            <div className="signupForm p-5 m-5 d-flex flex-column align-items-center">
              <h2 className="pb-4">
                Sign up&nbsp;&nbsp;
                <sup className="h6 d-none d-lg-inline-flex text-info"><small>Holiday Homes</small></sup>
              </h2>
              <form className="form d-flex flex-column align-items-center" onSubmit={this.handleSignupSubmit}>
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
                    placeholder="Username"
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
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                    value={password}
                  />
                </label>
                <br />
                <label className="text-light" htmlFor="showPassword">
                  Show Password
                  <input className="m-1" type="checkbox" onClick={e => toggleFn(e, 'password')} />
                </label>
                <br />
                <label htmlFor="passwordConfirmation">
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    className="passwordConfirmation"
                    onChange={this.handleChange}
                    value={passwordConfirmation}
                  />
                </label>
                <br />
                <label className="text-light" htmlFor="showPasswordConfirmation">
                  Show Password Confirmation
                  <input className="m-1" type="checkbox" onClick={e => toggleFn(e, 'passwordConfirmation')} />
                </label>
                <br />

                <button
                  type="submit"
                  className="submit btn btn-primary"
                >
                  Sign up
                </button>
              </form>
              <a href="/">
                <button type="submit" className="submit mt-5 btn btn-primary pl-4 pr-4">
                  Back
                </button>
              </a>
            </div>
          </div>
        </div>
      );
    }
}

Signup.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Signup);
