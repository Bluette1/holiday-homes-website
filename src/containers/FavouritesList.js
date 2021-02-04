import { connect } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Favourite from '../components/Favourite';
import { filteredFavourites } from '../selectors/index';
import '../css/FavouritesList.css';

const FavouritesList = ({
  favourites, showDetails,
}) => (
  <>
    {favourites && favourites.length ? (
      favourites.map(favourite => <Favourite key={`holidayHome-${uuid()}`} favourite={favourite} showDetails={showDetails} />)
    ) : (
      <>
        <p className="no-holiday-homes">
          No favourites were found.
        </p>
      </>
    )}
  </>
);

FavouritesList.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
  showDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { favourites, user, filter } = state;
  return { favourites: filteredFavourites(favourites, filter), user };
};

export default connect(
  mapStateToProps,
)(FavouritesList);
