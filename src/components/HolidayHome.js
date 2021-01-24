import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/HolidayHome.css';
import cx from 'classnames';
import { httpProtocol, host, port } from '../envVariables';
import { removeFromFavourites, addToFavorites } from '../actions';

const HolidayHome = ({
  holidayHome, hideFromList, user, favouriteId, removeFromFavourites, addToFavorites,
}) => {
  const [resRedirect, setRedirect] = useState(false);
  const {
    title, owner, manager, address, id, description, email,
    phone, category, price, rating,
  } = holidayHome;

  const detailsUrl = () => `/details?img=${holidayHome.image_url}&t=${title}
  &d=${description}&e=${email}&p=${phone}&o=${owner}&m=${manager}&i=${id}`;

  const handleSubmitDetails = e => {
    e.preventDefault();
    setRedirect(true);
  };

  const handleAddToFavourites = e => {
    e.preventDefault();
    axios.post(`${httpProtocol}://${host}:${port}/holiday_homes/${id}/favourites`, {},
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(response => {
        const savedFavourite = response.data;
        savedFavourite.holiday_home = holidayHome;
        addToFavorites(savedFavourite);
      });
  };

  const handleRemoveFromFavourites = e => {
    e.preventDefault();
    axios.delete(`${httpProtocol}://${host}:${port}/favourites/${favouriteId}`,
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(() => {
        removeFromFavourites(favouriteId);
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
        <button type="button" onClick={favouriteId ? handleRemoveFromFavourites : handleAddToFavourites} className="favourites">
          {favouriteId ? 'Remove from favourites' : 'Add to favourites'}
        </button>
        {hideFromList ? (
          <button type="button" onClick={e => hideFromList(e, id)} className="hide">Hide from list</button>
        ) : null}
      </div>
    </div>
  );
};

HolidayHome.propTypes = {
  holidayHome: PropTypes.objectOf(PropTypes.any).isRequired,
  favouriteId: PropTypes.number,
  hideFromList: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

HolidayHome.defaultProps = {
  favouriteId: null,
};

export default connect(
  state => ({ user: state.user }), { removeFromFavourites, addToFavorites },
)(HolidayHome);
