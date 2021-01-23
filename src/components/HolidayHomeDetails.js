import React from 'react';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import '../css/HolidayHomeDetails.css';

const HolidayHomeDetails = props => {
  const { location: { search } } = props;
  const parsedParams = QueryString.parse(search);
  const {
    img, t, d, e, p, o, m,
  } = parsedParams;
  return (
    <div className="details-bg">
      <div className="header">
        <ul className="holidayHomeslist-heading">
          <li>
            Holiday-Homes
          </li>
          <a href="/"><button type="button">Back</button></a>
        </ul>
      </div>
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
          <h4 className="title">{t}</h4>
          <h4 className="owner">{o}</h4>
          <h4 className="manager">{m}</h4>
        </div>
        <div>
          <h4>
            Email:&nbsp;
            {e}
          </h4>
          <h4>
            Phone:&nbsp;
            {p}
          </h4>
        </div>
      </div>
      <div className="holidayHome-row d">
        <div>
          <div className="d-heading">
            <h4 className="Description">Description:</h4>
          </div>
          <p className="body-d">{d}</p>
        </div>
      </div>
    </div>
  );
};

HolidayHomeDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default HolidayHomeDetails;
