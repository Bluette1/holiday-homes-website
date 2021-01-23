import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import axios from 'axios';
import QueryString from 'query-string';
import HolidayHome from '../components/HolidayHome';
import filteredHolidayHomes from '../selectors/filteredHolidayHomes';
import { registerHolidayHomes, removeHolidayHome, hideFromList } from '../actions/index';
import '../css/HolidayHomesList.css';
import { httpProtocol, host, port } from '../envVariables';

const HolidayHomesList = ({
  holidayHomes, registerHolidayHomes, hideFromList, location: { search }, user,
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
        });
    }
    return () => clearTimeout(timer);
  }, []);

  const removeThisHolidayHome = id => {
    removeHolidayHome(id);
  };

  const hideThisHolidayHome = id => {
    hideFromList(id);
  };
  const result = (
    <div>
      {holidayHomes && holidayHomes.length ? (
        holidayHomes.map(holidayHome => <HolidayHome key={`holidayHome-${uuid()}`} holidayHome={holidayHome} hideFromList={hideThisHolidayHome} removeHolidayHome={removeThisHolidayHome} />)
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
  const { filter, holidayHomes, user } = state;
  return { holidayHomes: filteredHolidayHomes(holidayHomes, filter), user };
};

HolidayHomesList.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  holidayHomes: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerHolidayHomes: PropTypes.func.isRequired,
  hideFromList: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(connect(
  mapStateToProps,
  { registerHolidayHomes, removeHolidayHome, hideFromList },
)(HolidayHomesList));
