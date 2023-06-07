import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HolidayHomesList from '../containers/HolidayHomesList';
import FavouritesList from '../containers/FavouritesList';
import SearchResultsList from '../containers/SearchResultsList';
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
  const [renderLogin, setRenderLogin] = useState(false);
  const [renderSearchResults, setRenderResults] = useState({ show: false, params: '' });

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

  const showSearchResults = (show = true, params = '') => {
    setRenderResults({ show, params });
  };

  const showUser = (value = true) => {
    setRenderUser(value);
  };

  const showLogin = (value = true) => {
    setRenderLogin(value);
  };

  const NavBarWithProps = ({ showForm }) => (
    <Navbar
      showFavourites={showFavourites}
      showNewHolidayHome={showNewHolidayHome}
      showDetails={showDetails}
      showUser={showUser}
      showSearchResults={showSearchResults}
      showForm={showForm}
      showLogin={showLogin}
    />
  );

  NavBarWithProps.propTypes = {
    showForm: PropTypes.bool,
  };

  NavBarWithProps.defaultProps = {
    showForm: true,
  };

  if (renderFavourites) {
    return (
      <div>
        <NavBarWithProps />
        <FavouritesList showFavourites={showFavourites} showDetails={showDetails} />
      </div>
    );
  }

  if (renderDetails) {
    return (
      <div>
        <NavBarWithProps />
        <Details holidayHomeObj={holidayHome} favouriteId={favouriteId} showDetails={showDetails} />
      </div>
    );
  }

  if (renderNewForm) {
    if (!user) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBarWithProps />
        <HolidayHomeForm showFavourites={showFavourites} showNewHolidayHome={showNewHolidayHome} />
      </div>
    );
  }

  if (renderUser) {
    if (!user) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBarWithProps />
        <User user={user} showUser={showUser} />
      </div>
    );
  }

  if (renderLogin) {
    return <Redirect to="/login" />;
  }

  if (renderSearchResults.show) {
    if (!user) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBarWithProps showForm={false} />

        <SearchResultsList
          params={renderSearchResults.params}
          showSearchResults={showSearchResults}
          showDetails={showDetails}
        />
      </div>
    );
  }

  return (
    <div>
      <NavBarWithProps />
      <h3 className="mb-4 mt-2 text-center">Holiday homes</h3>
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
