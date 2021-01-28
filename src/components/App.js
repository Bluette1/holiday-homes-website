import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HolidayHomesList from '../containers/HolidayHomesList';
import FavouritesList from '../containers/FavouritesList';
import HolidayHomeForm from '../containers/HolidayHomeForm';
import Details from './HolidayHomeDetails';
import Navbar from './Navbar';
import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

const App = ({ user }) => {
  const [renderFavourites, setRenderFavourites] = useState(false);
  const [renderDetails, setRenderDetails] = useState(false);
  const [holidayHome, setHolidayHome] = useState(null);
  const [favouriteId, setFavouriteId] = useState(null);
  const [renderNewForm, setRenderNewForm] = useState(false);
  const [renderUser, setRenderUser] = useState(false);

  const showFavourites = (value = true) => {
    setRenderFavourites(value);
  };

  const showDetails = (value = true, holidayHome, favouriteId) => {
    setHolidayHome(holidayHome);
    setFavouriteId(favouriteId);
    setRenderFavourites(false);
    setRenderUser(false);
    setRenderDetails(value);
  };

  const showNewHolidayHome = (value = true) => {
    setRenderNewForm(value);
  };

  const showUser = (value = true) => {
    setRenderUser(value);
  };

  if (!user) {
    return <Redirect to="/login" />;
  }
  if (renderFavourites) {
    return (
      <div>
        <Navbar
          showFavourites={showFavourites}
          showNewHolidayHome={showNewHolidayHome}
          showDetails={showDetails}
          showUser={showUser}
        />
        <FavouritesList showFavourites={showFavourites} showDetails={showDetails} />
      </div>
    );
  }

  if (renderDetails) {
    return (
      <div>
        <Navbar
          showFavourites={showFavourites}
          showNewHolidayHome={showNewHolidayHome}
          showDetails={showDetails}
          showUser={showUser}
        />
        <Details holidayHome={holidayHome} favouriteId={favouriteId} showDetails={showDetails} />
      </div>
    );
  }

  if (renderNewForm) {
    return (
      <div>
        <Navbar
          showFavourites={showFavourites}
          showNewHolidayHome={showNewHolidayHome}
          showDetails={showDetails}
          showUser={showUser}
        />
        <HolidayHomeForm showFavourites={showFavourites} showNewHolidayHome={showNewHolidayHome} />
      </div>
    );
  }

  if (renderUser) {
    return (
      <div>
        <Navbar
          showFavourites={showFavourites}
          showNewHolidayHome={showNewHolidayHome}
          showDetails={showDetails}
          showUser={showUser}
        />
        <User user={user} showUser={showUser} />
      </div>
    );
  }

  return (
    <div>
      <Navbar
        showFavourites={showFavourites}
        showNewHolidayHome={showNewHolidayHome}
        showDetails={showDetails}
        showUser={showUser}
      />
      <HolidayHomesList showDetails={showDetails} />
    </div>
  );
};
App.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  user: {},
};

export default connect(state => ({ user: state.user }))(App);
