import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import axios from 'axios';
import HolidayHome from '../components/HolidayHome';
import { filteredHolidayHomes, favourite } from '../selectors';
import {
  registerHolidayHomes, removeHolidayHome, hideFromList, registerFavourites,
} from '../actions/index';
import '../css/HolidayHomesList.css';
import { httpProtocol, host, port } from '../envVariables';

const HolidayHomesList = ({
  holidayHomes, registerHolidayHomes, hideFromList, user,
  registerFavourites, favourites, showDetails, params,
}) => {
  const [renderRes, setRenderRes] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderRes(true);
    }, 1500);

    // if (holidayHomes.length === 0 || params !== '') {
    axios.get(`${httpProtocol}://${host}:${port}/holiday_homes?search_params=${params}`,
      { headers: { Authorization: `Bearer ${user.authentication_token}` } })
      .then(response => {
        registerHolidayHomes(response.data.reverse());
        if (favourites.length === 0) {
          axios.get(`${httpProtocol}://${host}:${port}/favourites`,
            { headers: { Authorization: `Bearer ${user.authentication_token}` } })
            .then(responseFavourites => {
              registerFavourites(responseFavourites.data.reverse());
            });
        }
      });
    // }
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
  return {
    holidayHomes: filteredHolidayHomes(holidayHomes, filter),
    user,
    favourites,
  };
};

HolidayHomesList.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  holidayHomes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerHolidayHomes: PropTypes.func.isRequired,
  registerFavourites: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  hideFromList: PropTypes.func.isRequired,
  params: PropTypes.string,
};

HolidayHomesList.defaultProps = {
  params: '',
};

export default connect(
  mapStateToProps,
  {
    registerHolidayHomes,
    removeHolidayHome,
    hideFromList,
    registerFavourites,
  },
)(HolidayHomesList);
