import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import axios from 'axios';
import HolidayHome from '../components/HolidayHome';
import { filteredHolidayHomes, favourite } from '../selectors';
import {
  registerHolidayHomes,
  removeHolidayHome,
  registerFavourites,
} from '../actions/index';
import '../css/HolidayHomesList.css';
import { httpProtocol, host, port } from '../envVariables';

const HolidayHomesList = ({
  holidayHomes,
  registerHolidayHomes,
  user,
  registerFavourites,
  favourites,
  showDetails,
  params,
}) => {
  useEffect(() => {
    axios
      .get(
        `${httpProtocol}://${host}:${port}/holiday_homes?search_params=${params}`,
        // { headers: { Authorization: `Bearer ${user.authentication_token}` } }
      )
      .then(response => {
        registerHolidayHomes(response.data.reverse());
        if (user && favourites.length === 0) {
          axios
            .get(`${httpProtocol}://${host}:${port}/favourites`, {
              headers: { Authorization: `Bearer ${user.authentication_token}` },
            })
            .then(responseFavourites => {
              registerFavourites(responseFavourites.data.reverse());
            });
        }
      });
  }, []);

  const removeThisHolidayHome = holidayHome => {
    removeHolidayHome(holidayHome);
  };

  const isAFavourite = id => favourite(favourites, id);

  return (
    <>
      {holidayHomes && holidayHomes.length ? (
        holidayHomes.map(holidayHome => (
          <HolidayHome
            key={`holidayHome-${uuid()}`}
            holidayHomeObj={holidayHome}
            removeHolidayHome={removeThisHolidayHome}
            favouriteId={isAFavourite(holidayHome.id)}
            showDetails={showDetails}
          />
        ))
      ) : (
        <>
          <p className="no-holiday-homes">No holiday homes were found</p>
        </>
      )}
    </>
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
  params: PropTypes.string,
};

HolidayHomesList.defaultProps = {
  params: '',
};

export default connect(mapStateToProps, {
  registerHolidayHomes,
  removeHolidayHome,
  registerFavourites,
})(HolidayHomesList);
