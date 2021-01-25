import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/HolidayHomeDetails.css';
import { httpProtocol, host, port } from '../envVariables';
import { removeFromFavourites, addToFavorites } from '../actions';

const HolidayHomeDetails = ({
  user, holidayHome, favouriteId, removeFromFavourites, addToFavorites, showDetails,
}) => {
  const [resRedirect, setRedirect] = useState(false);
  const [displayFavourite, setDisplayFavourite] = useState(favouriteId);

  const handleAddToFavourites = e => {
    e.preventDefault();
    const { id } = holidayHome;
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

  const {
    title, category, email, phone, img, owner, manager, description,
  } = holidayHome;

  return resRedirect ? <Redirect to="/" /> : (
    <div className="details-bg">
      {' '}
      <div className="image details-pg">
        <div
          className="image-area details-pg"
          style={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0% 0%',
            backgroundSize: 'cover',
          }}
        />
      </div>
      <div className="holidayHome-row details-pg">
        <div className="title-category">
          <h4 className="title">{title}</h4>
          <h4 className="title">{category}</h4>
          <h4 className="owner">{owner}</h4>
          <h4 className="manager">{manager}</h4>
        </div>
        <div>
          <h4>
            Email:&nbsp;
            {email}
          </h4>
          <h4>
            Phone:&nbsp;
            {phone}
          </h4>
        </div>
      </div>
      <div className="holidayHome-row d">
        <div>
          <div className="d-heading">
            <h4 className="Description">Description:</h4>
            <p>
              Current Viewer:Phone:&nbsp;
              {user.username}
            </p>
          </div>
          <p className="body-d">{description}</p>
        </div>
      </div>
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
