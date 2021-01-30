import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css/HolidayHome.css';
import axios from 'axios';
import {
  httpProtocol, host, port, cloudName,
} from '../envVariables';
import { removeFromFavourites, addToFavorites } from '../actions';
import RatingComponent from './RatingComponent';

const HolidayHome = ({
  holidayHome, hideFromList, favouriteId, showDetails, user,
  removeFromFavourites, addToFavorites,
}) => {
  const {
    title, address, id,
    category, price, rating,
  } = holidayHome;

  const handleSubmitDetails = e => {
    e.preventDefault();
    showDetails(true, holidayHome, favouriteId);
  };

  const handleAddToFavourites = e => {
    e.preventDefault();
    const { id } = holidayHome;
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

  const baseImgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1611749658/`;
  let url;
  if (holidayHome.image_file_name) {
    url = `${baseImgUrl}${id}/original/${holidayHome.image_file_name}`;
  } else if (holidayHome.image_url !== '') {
    url = holidayHome.image_url;
  } else {
    url = 'https://projectbucket-223.s3.us-east-2.amazonaws.com/home_image.png';
  }

  return (
    <div className={cx('d-flex justify-content-center',
      holidayHome.hide && 'hidden')}
    >
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
        <div className="">
          <div
            className="d-flex justify-content-md-between flex-md-row row mt-5 flex-col"
          >
            <div className="title-category col-5">
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
            <DropdownButton id="dropdown-basic-button" title="Actions">
              <Dropdown.Item onClick={handleSubmitDetails}>View details</Dropdown.Item>
              {hideFromList ? (
                <Dropdown.Item className="hide" onClick={e => hideFromList(e, id)}>
                  Hide from list
                </Dropdown.Item>
              ) : null}
              <Dropdown.Item
                onClick={favouriteId ? handleRemoveFromFavourites : handleAddToFavourites}
              >
                {favouriteId ? 'Remove from favourites' : 'Add to favourites'}
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
};

HolidayHome.propTypes = {
  holidayHome: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  favouriteId: PropTypes.number,
  hideFromList: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

HolidayHome.defaultProps = {
  favouriteId: null,
};

export default connect(
  state => ({ user: state.user }), { removeFromFavourites, addToFavorites },
)(HolidayHome);
