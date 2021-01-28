import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/HolidayHome.css';
import cx from 'classnames';
import {
  httpProtocol, host, port, cloudName,
} from '../envVariables';
import { removeFromFavourites } from '../actions';
import RatingComponent from './RatingComponent';

const HolidayHome = ({
  favourite, user, removeFromFavourites, showDetails,
}) => {
  const holidayHome = favourite.holiday_home;
  const { id } = favourite;

  const {
    title, address,
    category, price, rating,
  } = holidayHome;

  const holidayHomeId = holidayHome.id;
  const baseImgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1611749658/`;
  const url = `${baseImgUrl}${holidayHomeId}/original/${holidayHome.image_file_name}`;

  const handleSubmitDetails = e => {
    e.preventDefault();
    showDetails(true, holidayHome, id);
  };

  const handleRemoveFromFavourites = e => {
    e.preventDefault();
    axios.delete(`${httpProtocol}://${host}:${port}/favourites/${id}`,
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(() => {
        removeFromFavourites(favourite.id);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-12">
        <div
          className="image-area"
          style={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
          }}
        >
          <RatingComponent className="rating" rating={rating} />
        </div>
        <div
          className={cx(
            'd-flex justify-content-md-between flex-md-row row mt-5 flex-col',
            holidayHome.hide && 'hidden',
          )}
        >
          <div className="title-category">
            <p className="category">{category}</p>
            <p className="price">
              $&nbsp;
              {price}
              &nbsp;
              per Month
            </p>
            <h4 className="title">{title}</h4>
            <p className="address">{address}</p>
          </div>
          <div className="col-md-7 text-align-right ml-n3 ml-md-0 d-sm-block d-flex flex-column">
            <button type="button" onClick={handleSubmitDetails} className="details">View details</button>
            <button type="button" onClick={handleRemoveFromFavourites} className="favourites">
              Remove from favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

HolidayHome.propTypes = {
  favourite: PropTypes.objectOf(PropTypes.any).isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(state => ({ user: state.user }), { removeFromFavourites })(HolidayHome);
