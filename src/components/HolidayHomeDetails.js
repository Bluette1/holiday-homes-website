import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/HolidayHomeDetails.css';
import {
  httpProtocol, host, port, cloudName,
} from '../envVariables';
import { removeFromFavourites, addToFavorites } from '../actions';
import RatingComponent from './RatingComponent';

const HolidayHomeDetails = ({
  user, holidayHome, favouriteId, removeFromFavourites, addToFavorites, showDetails,
}) => {
  const [resRedirect, setRedirect] = useState(false);
  const [displayFavourite, setDisplayFavourite] = useState(favouriteId);
  const {
    title, email, phone, owner, manager, description, rating, id,
  } = holidayHome;
  const baseImgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1611749658/`;
  let url;
  if (holidayHome.image_file_name) {
    url = `${baseImgUrl}${id}/original/${holidayHome.image_file_name}`;
  } else if (holidayHome.image_url !== '') {
    url = holidayHome.image_url;
  } else {
    url = 'https://projectbucket-223.s3.us-east-2.amazonaws.com/home_image.png';
  }

  const handleAddToFavourites = e => {
    e.preventDefault();
    axios.post(`${httpProtocol}://${host}:${port}/holiday_homes/${id}/favourites`, {},
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(response => {
        const savedFavourite = response.data;
        savedFavourite.holiday_home = holidayHome;
        addToFavorites(savedFavourite);
        setDisplayFavourite(savedFavourite.id);
      });
  };

  const handleRemoveFromFavourites = e => {
    e.preventDefault();
    axios.delete(`${httpProtocol}://${host}:${port}/favourites/${favouriteId}`,
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(() => {
        removeFromFavourites(favouriteId);
        setDisplayFavourite(null);
      });
  };

  const handleRedirect = e => {
    e.preventDefault();
    showDetails(false);
    setRedirect(true);
  };

  return resRedirect ? <Redirect to="/" /> : (
    <div className="d-flex justify-content-center">
      <div className="col-12">
        {' '}
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
        <div className="mt-5">
          <div className="title-category">
            <h4 className="title">{title}</h4>
            <p className="owner">{owner}</p>
            <p className="manager">{manager}</p>
            <p>
              Email:&nbsp;
              {email}
            </p>
            <p>
              Phone:&nbsp;
              {phone}
            </p>
            <p className="body-d">{description}</p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="submit"
              onClick={handleRedirect}
            >
              BACK
            </button>
            <button type="button" onClick={displayFavourite ? handleRemoveFromFavourites : handleAddToFavourites} className="favourites">
              {displayFavourite ? 'Remove from favourites' : 'Add to favourites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

HolidayHomeDetails.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  holidayHome: PropTypes.objectOf(PropTypes.any).isRequired,
  favouriteId: PropTypes.number,
  addToFavorites: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
};

HolidayHomeDetails.defaultProps = {
  favouriteId: null,
};

export default connect(
  state => ({ user: state.user }),
  { removeFromFavourites, addToFavorites },
)(HolidayHomeDetails);
