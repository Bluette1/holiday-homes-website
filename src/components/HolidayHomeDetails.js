import React from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import '../css/HolidayHomeDetails.css';

class HolidayHomeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resRedirect: false,
    };
  }

  handleRedirect = e => {
    e.preventDefault();
    this.setState({
      resRedirect: true,
    });
  };

  render() {
    const { state: { resRedirect } } = this;
    const { location: { search }, user } = this.props;
    const parsedParams = QueryString.parse(search);
    const {
      img, t, d, e, p, o, m,
    } = parsedParams;
    return resRedirect ? <Redirect to="/" /> : (
      <div className="details-bg">
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
              <p>
                Current Viewer:Phone:&nbsp;
                {user.username}
              </p>
            </div>
            <p className="body-d">{d}</p>
          </div>
        </div>
        <button
          type="button"
          className="submit"
          onClick={this.handleRedirect}
        >
          BACK
        </button>
      </div>
    );
  }
}

HolidayHomeDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  state => ({ user: state.user }),
)(HolidayHomeDetails);
