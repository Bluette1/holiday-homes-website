import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createHolidayHome } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class HolidayHomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', category: '', address: '', email: '', phone: '',
    };
  }

    handleChange = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      });
    }

    handleSubmit = e => {
      e.preventDefault();
      const {
        state: {
          title, category, address, email, phone,
        },
      } = this;
      const { props: { createHolidayHome, user } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/holiday_homes`, {
        title, category, address, email, phone,
      }, { headers: { Authorization: `Bearer ${user.authentication_token}` } })
        .then(response => {
          createHolidayHome(response.data);
        });

      // resets the component's state
      this.setState({
        title: '', category: '', address: '', email: '', phone: '',
      });
      document.getElementById('holiday-home-select').selectedIndex = 0;
    };

    render() {
      const {
        state: {
          address, email, phone, category, title,
        },
      } = this;

      const { props: { categories } } = this;
      return (
        <div>
          <h3 className="form-title">ADD NEW HOLIDAY HOME</h3>

          <form className="holiday-home-form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">
              <input
                className="input-title"
                onChange={this.handleChange}
                name="title"
                value={title}
                placeholder="Holiday home title"
              />
            </label>
            <br />
            <label htmlFor="address">
              <input
                className="input-address"
                name="address"
                onChange={this.handleChange}
                value={address}
                placeholder="Address"
              />
            </label>
            {' '}
            <br />
            <label htmlFor="email">
              <input
                className="input-email"
                name="email"
                onChange={this.handleChange}
                value={email}
                placeholder="Email"
              />
            </label>
            {' '}
            <br />
            <label htmlFor="phone">
              <input
                className="input-phone"
                name="phone"
                onChange={this.handleChange}
                value={phone}
                placeholder="Phone"
              />
            </label>
            {' '}
            <br />
            <select
              className="choose-category"
              name="category"
              value={category}
              id="holiday-home-select"
              onChange={this.handleChange}
            >
              <option>Category</option>
              {categories.map(option => (
                <option key={`key-${option}`} value={option}>
                  {option}
                </option>
              ))}
              ;
            </select>
            <br />
            <button
              type="submit"
              className="submit"
            >
              ADD HOLIDAY HOME
              {/* <span className="add-holiday-form">ADD HOLIDAY HOME</span> */}
            </button>
          </form>
        </div>
      );
    }
}

HolidayHomeForm.propTypes = {
  createHolidayHome: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(
  state => ({ user: state.user, categories: state.categories }), { createHolidayHome },
)(HolidayHomeForm);
