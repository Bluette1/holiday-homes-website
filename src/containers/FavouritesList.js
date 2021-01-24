import { connect } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Favourite from '../components/Favourite';
import '../css/FavouritesList.css';

const FavouritesList = ({
  favourites, user,
}) => (
  <div>
    <h3>
      {user.username}
      : favourites
      {' '}
    </h3>
    {favourites && favourites.length ? (
      favourites.map(favourite => <Favourite key={`holidayHome-${uuid()}`} favourite={favourite} />)
    ) : (
      <div>
        <p className="no-holiday-homes">
          No favourites were found.
        </p>
      </div>
    )}
  </div>
);

FavouritesList.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const { favourites, user } = state;
  return { favourites, user };
};

export default connect(
  mapStateToProps,
)(FavouritesList);
