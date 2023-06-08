import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/HolidayHomeDetails.css';
import {
  httpProtocol, host, port, cloudName,
} from '../envVariables';
import { removeFromFavourites, addToFavorites } from '../actions';
import RatingComponent from './RatingComponent';
import urlExists from '../urlExists';

const HolidayHomeDetails = ({
  user, holidayHomeObj, favouriteId, removeFromFavourites, addToFavorites, showDetails, favourites,
}) => {
  const holidayHome = holidayHomeObj.holiday_home;

  const [resRedirect, setRedirect] = useState(false);
  const [displayFavourite, setDisplayFavourite] = useState(favouriteId);
  const {
    rating, id, price, description, title,
  } = holidayHome;
  const { creator } = holidayHomeObj;
  const { name } = creator;

  const baseImgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1611749658/`;
  let url;

  if (holidayHome.image_url !== '' && urlExists(holidayHome.image_url)) {
    url = holidayHome.image_url;
  } else if (holidayHome.image_file_name && urlExists(`${baseImgUrl}${id}/original/${holidayHome.image_file_name}`)) {
    url = `${baseImgUrl}${id}/original/${holidayHome.image_file_name}`;
  } else {
    url = 'https://holiday-homes-project.s3.eu-north-1.amazonaws.com/home_image.png';
  }

  let photoUrl = 'https://holiday-homes-project.s3.eu-north-1.amazonaws.com/profile-icon-png-910.png';
  if (creator.photo_file_name && urlExists(`${baseImgUrl}${creator.id}/thumb/${creator.photo_file_name}`)) {
    photoUrl = `${baseImgUrl}${creator.id}/thumb/${creator.photo_file_name}`;
  }
  const handleAddToFavourites = e => {
    e.preventDefault();
    if (user) {
      axios
        .post(
          `${httpProtocol}://${host}:${port}/holiday_homes/${id}/favourites`,
          {},
          { headers: { Authorization: `Bearer ${user.authentication_token}` } },
        )
        .then(response => {
          const savedFavourite = response.data;
          savedFavourite.holiday_home = holidayHome;
          addToFavorites(savedFavourite);
          setDisplayFavourite(savedFavourite.id);
        });
    } else {
      const randomId = favourites.length + 1;
      const newFavourite = {
        id: randomId,
        holiday_home: holidayHome,
      };
      addToFavorites(newFavourite);
      setDisplayFavourite(newFavourite.id);
    }
  };

  const handleRemoveFromFavourites = e => {
    e.preventDefault();
    if (user) {
      axios
        .delete(
          `${httpProtocol}://${host}:${port}/favourites/${displayFavourite}`,
          { headers: { Authorization: `Bearer ${user.authentication_token}` } },
        )
        .then(() => {
          removeFromFavourites(displayFavourite);
          setDisplayFavourite(null);
        });
    } else {
      removeFromFavourites(displayFavourite);
      setDisplayFavourite(null);
    }
  };

  const handleRedirect = e => {
    e.preventDefault();
    showDetails(false);
    setRedirect(true);
  };

  return resRedirect ? <Redirect to="/" /> : (
    <div className="d-flex justify-content-center">
      <article className="col-12">
        <h4 className="title text-center">{title}</h4>
        <div
          className="image-area d-flex flex-column justify-content-end"
          style={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
          }}
        >
          <section className="text-light d-flex justify-content-between pl-3 pr-3 pb-5">
            <div className="d-sm-flex justify-content-sm-between">
              <div>
                <img src={photoUrl} alt="holiday home" style={{ borderRadius: '50%', margin: '5px' }} />
              </div>
              <>
                <p className="font-weight-bold">{name}</p>
                <RatingComponent className="rating h6" rating={rating} />
              </>
            </div>
            <h5 className="price font-weight-bold pt-3 p-sm-0" data-testid="price">
              $&nbsp;
              {price}
              &nbsp;
              <br />
              <small className="font-weight-bold">per Month</small>
            </h5>
          </section>
        </div>
        <div className="mt-5 col-12">
          <div className="description">
            <p className="body-d">{description}</p>
          </div>
        </div>
        <div className="dropdown-list col-12 d-flex justify-content-center pb-5 pt-3 mb-5 mt-2">

          <DropdownButton id="dropdown-basic-button" title="More...">
            <Dropdown.Item
              onClick={displayFavourite ? handleRemoveFromFavourites : handleAddToFavourites}
            >
              {displayFavourite ? 'Remove from favourites' : 'Add to favourites'}
            </Dropdown.Item>

            <Dropdown.Item className="hide" onClick={handleRedirect}>
              BACK
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </article>
    </div>
  );
};

HolidayHomeDetails.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.any).isRequired,
  holidayHomeObj: PropTypes.objectOf(PropTypes.any).isRequired,
  favouriteId: PropTypes.number,
  addToFavorites: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
};

HolidayHomeDetails.defaultProps = {
  favouriteId: null,
};

export default connect(
  state => ({ user: state.user, favourites: state.favourites }),
  { removeFromFavourites, addToFavorites },
)(HolidayHomeDetails);
