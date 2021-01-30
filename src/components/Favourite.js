import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/HolidayHome.css';
import {
  httpProtocol, host, port, cloudName,
} from '../envVariables';
import { removeFromFavourites } from '../actions';
import RatingComponent from './RatingComponent';

const Favourite = ({
  favourite, user, removeFromFavourites, showDetails,
}) => {
  const [resRedirect, setRedirect] = useState(false);
  const holidayHome = favourite.holiday_home;
  const { id } = favourite;

  const {
    title,
    category, price, rating,
  } = holidayHome;

  const holidayHomeId = holidayHome.id;
  const baseImgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1611749658/`;
  let url;
  if (holidayHome.image_file_name) {
    url = `${baseImgUrl}${holidayHomeId}/original/${holidayHome.image_file_name}`;
  } else if (holidayHome.image_url !== '') {
    url = holidayHome.image_url;
  } else {
    url = 'https://projectbucket-223.s3.us-east-2.amazonaws.com/home_image.png';
  }

  const handleRedirect = e => {
    e.preventDefault();
    showDetails(false);
    setRedirect(true);
  };

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

  return (resRedirect ? <Redirect to="/" /> : (
    <div className="d-flex justify-content-center">
      <div className="col-12">
        <div className="imgContainer">
          <img className="image-area w-100 h-100" role="presentation" onKeyDown={handleSubmitDetails} onClick={handleSubmitDetails} src={url} alt="holiday home" />
        </div>
        <div className="col-12 d-flex justify-content-between pt-3">
          <div className="title-category">
            <h4 className="title">{title}</h4>
            <RatingComponent rating={rating} />
            <p className="category pt-3">{category}</p>
          </div>
          <div>
            <h5 className="price">
              $&nbsp;
              {price}
              &nbsp;
              <br />
              <small className="text-muted">per Month</small>
            </h5>
          </div>
        </div>
        <div className="dropdown-list col-12 d-flex justify-content-center pb-5 pt-3 mb-5 mt-2">

          <DropdownButton id="dropdown-basic-button" title="More...">
            <Dropdown.Item onClick={handleRemoveFromFavourites}>
              Remove from favourites
            </Dropdown.Item>

            <Dropdown.Item onClick={handleRedirect}>
              BACK
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  )
  );
};

Favourite.propTypes = {
  favourite: PropTypes.objectOf(PropTypes.any).isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(state => ({ user: state.user }), { removeFromFavourites })(Favourite);
