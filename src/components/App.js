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
          showSearchResults={showSearchResults}
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
          showSearchResults={showSearchResults}
        />
        <Details holidayHomeObj={holidayHome} favouriteId={favouriteId} showDetails={showDetails} />
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
          showSearchResults={showSearchResults}
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
          showSearchResults={showSearchResults}
        />
        <User user={user} showUser={showUser} />
      </div>
    );
  }

  if (renderSearchResults.show) {
    return (
      <div>
        <Navbar
          showFavourites={showFavourites}
          showNewHolidayHome={showNewHolidayHome}
          showDetails={showDetails}
          showUser={showUser}
          showSearchResults={showSearchResults}
          showForm={false}
        />
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
      <Navbar
        showFavourites={showFavourites}
        showNewHolidayHome={showNewHolidayHome}
        showDetails={showDetails}
        showUser={showUser}
        showSearchResults={showSearchResults}
      />
      <h3 className="mb-4 mt-2 text-center">Holiay homes</h3>
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
