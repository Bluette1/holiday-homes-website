import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HolidayHomesList from '../containers/HolidayHomesList';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

const App = ({ user }) => (
  <div className="content">
    {user ? (
      <div className="m-auto">
        <Navbar />
        <HolidayHomesList />
      </div>
    ) : <Redirect to="/login" />}
  </div>
);
App.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  user: {},
};

export default connect(state => ({ user: state.user }))(App);
