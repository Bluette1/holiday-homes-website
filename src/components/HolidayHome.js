import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css/HolidayHome.css';
import axios from 'axios';
import { httpProtocol, host, port } from '../envVariables';
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

  return (
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
          <RatingComponent className="rating" rating={rating} />
        </div>
      </div>
      <div className="right">
        <button type="button" onClick={handleSubmitDetails} className="details">View details</button>

        {hideFromList ? (
          <button type="button" onClick={e => hideFromList(e, id)} className="hide">Hide from list</button>
        ) : null}
        <button type="button" onClick={favouriteId ? handleRemoveFromFavourites : handleAddToFavourites} className="favourites">
          {favouriteId ? 'Remove from favourites' : 'Add to favourites'}
        </button>
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
