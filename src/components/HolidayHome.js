import React from 'react';
import PropTypes from 'prop-types';
import '../css/HolidayHome.css';
import cx from 'classnames';

const HolidayHome = ({
  holidayHome, hideFromList,
}) => {
  const {
    title, owner, manager, address, id, description, email, phone, category, price, rating,
  } = holidayHome;

  const detailsUrl = () => `/details?img=${holidayHome.image_url}&t=${title}
  &d=${description}&e=${email}&p=${phone}&o=${owner}&m=${manager}`;

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
        <a href={detailsUrl()}><button type="button" className="details">View details</button></a>
        <button type="button" className="hide" onClick={() => hideFromList(id)}>Hide from list</button>
      </div>

    </div>
  );
};

HolidayHome.propTypes = {
  holidayHome: PropTypes.objectOf(PropTypes.any).isRequired,
  hideFromList: PropTypes.func.isRequired,
};

export default HolidayHome;