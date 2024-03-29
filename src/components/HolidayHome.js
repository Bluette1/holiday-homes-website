import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/HolidayHome.css';
import {
  cloudName,
} from '../envVariables';
import { removeFromFavourites, addToFavorites } from '../actions';
import RatingComponent from './RatingComponent';
import urlExists from '../urlExists';

const HolidayHome = ({
  holidayHomeObj, favouriteId, showDetails,
}) => {
  const holidayHome = holidayHomeObj.holiday_home;

  const {
    title, id,
    category, price, rating,
  } = holidayHome;

  const handleSubmitDetails = e => {
    e.preventDefault();
    showDetails(true, holidayHomeObj, favouriteId);
  };

  const baseImgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1611749658/`;
  let url;
  if (holidayHome.image_url !== '' && urlExists(holidayHome.image_url)) {
    url = holidayHome.image_url;
  } else if (holidayHome.image_file_name && urlExists(`${baseImgUrl}${id}/original/${holidayHome.image_file_name}`)) {
    url = `${baseImgUrl}${id}/original/${holidayHome.image_file_name}`;
  } else {
    url = 'https://holiday-homes-project.s3.eu-north-1.amazonaws.com/home_image.png';
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="col-12">
        <div className="imgContainer">
          <img className="image-area w-100" role="presentation" onKeyDown={handleSubmitDetails} onClick={handleSubmitDetails} src={url} alt="holiday home" />
        </div>
        <div className="col-12 d-flex justify-content-between pt-3">
          <article className="title-category">
            <h4 className="title">{title}</h4>
            <RatingComponent rating={rating} />
            <p className="category pt-3">{category}</p>
          </article>
          <article>
            <h5 data-testid="price">
              $&nbsp;
              {price}
              &nbsp;
              <br />
              <small className="text-muted">per Month</small>
            </h5>
          </article>
        </div>
      </div>
    </div>
  );
};

HolidayHome.propTypes = {
  holidayHomeObj: PropTypes.objectOf(PropTypes.any).isRequired,
  favouriteId: PropTypes.number,
  showDetails: PropTypes.func.isRequired,
};

HolidayHome.defaultProps = {
  favouriteId: null,
};

export default connect(
  state => ({ user: state.user }), { removeFromFavourites, addToFavorites },
)(HolidayHome);
