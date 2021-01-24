import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/HolidayHome.css';
import cx from 'classnames';
import { httpProtocol, host, port } from '../envVariables';
import { removeFromFavourites } from '../actions';

const HolidayHome = ({ favourite, user, removeFromFavourites }) => {
  const holidayHome = favourite.holiday_home;
  const { id } = favourite;
  const [resRedirect, setRedirect] = useState(false);

  const {
    title, owner, manager, address, description, email,
    phone, category, price, rating,
  } = holidayHome;

  const detailsUrl = () => `/details?img=${holidayHome.image_url}&t=${title}
  &d=${description}&e=${email}&p=${phone}&o=${owner}&m=${manager}&i=${holidayHome.id}`;

  const handleSubmitDetails = e => {
    e.preventDefault();
    setRedirect(true);
  };

  const handleRemoveFromFavourites = e => {
    e.preventDefault();
    axios.delete(`${httpProtocol}://${host}:${port}/favourites/${id}`,
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(() => {
        removeFromFavourites(favourite.id);
      });
  };
  return resRedirect ? <Redirect to={detailsUrl()} /> : (
    <div
      className={cx(
        'holidayHome-row',
        holidayHome.hide && 'hidden',
      )}
    >
      <div className="title-category">
        <p className="category">{category}</p>
        <p className="price">{price}</p>
        <h4 className="title">{title}</h4>
        <p className="rating">{rating}</p>
        <p className="address">{address}</p>
      </div>
      <div>
        <div
          className="image-area"
          style={{
            backgroundImage: `url(${holidayHome.image_url})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
          }}
        >
          {' '}
        </div>
      </div>
      <div className="right">
        <button type="button" onClick={handleSubmitDetails} className="details">View details</button>
        <button type="button" onClick={handleRemoveFromFavourites} className="favourites">
          Remove from favourites
        </button>
      </div>

    </div>
  );
};

HolidayHome.propTypes = {
  favourite: PropTypes.objectOf(PropTypes.any).isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(state => ({ user: state.user }), { removeFromFavourites })(HolidayHome);
