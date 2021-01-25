import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import axios from 'axios';
import QueryString from 'query-string';
import HolidayHome from '../components/HolidayHome';
import { filteredHolidayHomes, favourite } from '../selectors';
import {
  registerHolidayHomes, removeHolidayHome, hideFromList, registerFavourites,
} from '../actions/index';
import '../css/HolidayHomesList.css';
import { httpProtocol, host, port } from '../envVariables';

const HolidayHomesList = ({
  holidayHomes, registerHolidayHomes, hideFromList, location: { search }, user,
  registerFavourites, favourites, showDetails,
}) => {
  const [renderRes, setRenderRes] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderRes(true);
    }, 1500);

    const parsedParams = QueryString.parse(search);
    const { key } = parsedParams;
    let queryPart = `key=${key}`;
    if (key === undefined) {
      queryPart = '';
    }
    if (holidayHomes.length === 0) {
      axios.get(`${httpProtocol}://${host}:${port}/holiday_homes?${queryPart}`,
        { headers: { Authorization: `Bearer ${user.authentication_token}` } })
        .then(response => {
          registerHolidayHomes(response.data);
          if (favourites.length === 0) {
            axios.get(`${httpProtocol}://${host}:${port}/favourites`,
              { headers: { Authorization: `Bearer ${user.authentication_token}` } })
              .then(responseFavourites => {
                registerFavourites(responseFavourites.data);
              });
          }
        });
    }
    return () => clearTimeout(timer);
  }, []);

  const removeThisHolidayHome = holidayHome => {
    removeHolidayHome(holidayHome);
  };

  const isAFavourite = id => favourite(favourites, id);

  const hideThisHolidayHome = (e, id) => {
    e.preventDefault();
    hideFromList(id);
  };

  const result = (
    <div>
      {holidayHomes && holidayHomes.length ? (
        holidayHomes.map(holidayHome => <HolidayHome key={`holidayHome-${uuid()}`} holidayHome={holidayHome} hideFromList={hideThisHolidayHome} removeHolidayHome={removeThisHolidayHome} favouriteId={isAFavourite(holidayHome.id)} showDetails={showDetails} />)
      ) : (
        <div>
          <p className="no-holiday-homes">
            No holiday homes were found
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div>{renderRes ? (result) : null}</div>
  );
};

const mapStateToProps = state => {
  const {
    filter, holidayHomes, user, favourites,
  } = state;
  return { holidayHomes: filteredHolidayHomes(holidayHomes, filter), user, favourites };
};

HolidayHomesList.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  holidayHomes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerHolidayHomes: PropTypes.func.isRequired,
  registerFavourites: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  hideFromList: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(connect(
  mapStateToProps,
  {
    registerHolidayHomes, removeHolidayHome, hideFromList, registerFavourites,
  },
)(HolidayHomesList));
