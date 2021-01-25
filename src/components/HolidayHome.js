import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css/HolidayHome.css';

const HolidayHome = ({
  holidayHome, hideFromList, favouriteId, showDetails,
}) => {
  const {
    title, address, id,
    category, price, rating,
  } = holidayHome;

  const handleSubmitDetails = e => {
    e.preventDefault();
    showDetails(true, holidayHome, favouriteId);
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
  showDetails: PropTypes.func.isRequired,
};

HolidayHome.defaultProps = {
  favouriteId: null,
};

export default connect(
  state => ({ user: state.user }),
)(HolidayHome);
