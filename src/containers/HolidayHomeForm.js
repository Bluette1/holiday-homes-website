import React from 'react';
import uuid from 'react-uuid';
import { Redirect } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createHolidayHome } from '../actions/index';
import {
  httpProtocol, host, port,
} from '../envVariables';

class HolidayHomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      address: '',
      email: '',
      phone: '',
      resRedirect: false,
      rating: 0,
      price: 0,
      image: null,
      imageSelected: false,
    };
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

    handleChange = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      });
    }

    handleChangeImage = event => {
      this.setState({
        image: event.target.files[0],
        imageSelected: true,
      });
    }

    handleRedirect = e => {
      const { showFavourites, showNewHolidayHome } = this.props;
      e.preventDefault();
      this.setState({
        resRedirect: true,
      });
      showFavourites(false);
      showNewHolidayHome(false);
    };

    handleSubmit = e => {
      e.preventDefault();
      const {
        state: {
          title, category, address, email, phone, rating, price, image,
        },
      } = this;
      const { props: { user, createHolidayHome } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/holiday_homes`, {
        title, category, address, email, phone, rating, price, image,
      }, { headers: { Authorization: `Bearer ${user.authentication_token}` } })
        .then(response => {
          createHolidayHome(response.data);
        });

      this.setState({
        title: '',
        category: '',
        address: '',
        email: '',
        phone: '',
        rating: 0,
        price: 0,
        image: null,
        imageSelected: false,
      });
      document.getElementById('holiday-home-select').selectedIndex = 0;
    };

    render() {
      const {
        state: {
          address, email, phone, category, title, image,
          resRedirect, rating, price, imageSelected,
        },
      } = this;

      const { props: { categories } } = this;
      return resRedirect ? <Redirect to="/" /> : (
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
            {' '}
            <br />
            <label htmlFor="rating">
              Holiday home rating out of 5
              <input
                className="input-rating"
                onChange={this.handleChange}
                name="rating"
                value={rating}
                placeholder=""
              />
            </label>
            {' '}
            <br />
            <label htmlFor="price">
              Price per month in US Dollars
              <input
                className="input-price"
                onChange={this.handleChange}
                name="price"
                value={price}
                placeholder=""
              />
            </label>
            <br />
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
                <option key={`${uuid()}-key-${option}`} value={option}>
                  {option}
                </option>
              ))}
              ;
            </select>
            <br />
            <input type="file" name="image" onChange={this.handleChangeImage} />
            {' '}
            {imageSelected ? (
              <span>
                <p>
                  Filename:
                  {image.name}
                </p>
                <p>
                  Filetype:
                  {image.type}
                </p>
                <p>
                  Size in bytes:
                  {image.size}
                </p>
                <p>
                  lastModifiedDate:
                  {' '}
                  {image.lastModifiedDate.toLocaleDateString()}
                </p>
              </span>
            ) : (
              <p>Select a file to show details</p>
            )}
            <br />
            <button
              type="submit"
              className="submit"
            >
              ADD HOLIDAY HOME
            </button>
          </form>

          <button
            type="submit"
            className="submit"
            onClick={this.handleRedirect}
          >
            BACK
          </button>
        </div>
      );
    }
}

HolidayHomeForm.propTypes = {
  createHolidayHome: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  showFavourites: PropTypes.func.isRequired,
  showNewHolidayHome: PropTypes.func.isRequired,
};
export default connect(
  state => ({ user: state.user, categories: state.categories }), { createHolidayHome },
)(HolidayHomeForm);
