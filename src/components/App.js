import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HolidayHomesList from '../containers/HolidayHomesList';
import FavouritesList from '../containers/FavouritesList';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

const App = ({ user }) => {
  const [renderFavourites, setRenderFavourites] = useState(false);
  const showFavourites = (value = true) => {
    setRenderFavourites(value);
  };
  const list = (
    <div>
      <Navbar showFavourites={showFavourites} />
      {renderFavourites
        ? <FavouritesList /> : (
          <HolidayHomesList showFavourites={showFavourites} />
        )}
    </div>
  );

  return (
    <div className="content">
      {user ? list : <Redirect to="/login" />}
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
