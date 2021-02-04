import { connect } from 'react-redux';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CategoryFilter from './CategoryFilter';
import { logout } from '../actions/index';
import '../css/Nav.css';

const Header = ({
  logout, user, showFavourites,
  showNewHolidayHome, showDetails, showUser, showSearchResults, showForm,
}) => {
  const [searchValue, setSearchValue] = useStateIfMounted('');

  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
  };
  const home = e => {
    e.preventDefault();

    showFavourites(false);
    showNewHolidayHome(false);
    showDetails(false);
    showUser(false);
    showSearchResults(false, '');
  };

  const favourites = e => {
    e.preventDefault();
    showNewHolidayHome(false);
    showDetails(false);
    showUser(false);
    showSearchResults(false, '');
    showFavourites();
  };

  const newHolidayHomeForm = e => {
    e.preventDefault();

    showFavourites(false);
    showDetails(false);
    showUser(false);
    showSearchResults(false, '');

    showNewHolidayHome();
  };

  const userPage = e => {
    e.preventDefault();

    showFavourites(false);
    showDetails(false);
    showNewHolidayHome(false);
    showSearchResults(false, '');
    showUser();
  };

  const search = e => {
    e.preventDefault();

    showFavourites(false);
    showNewHolidayHome(false);
    showDetails(false);
    showUser(false);
    showSearchResults(true, searchValue);
  };

  return (
    <div className="d-flex justify-content-between">
      <Navbar expand="lg">
        <Navbar.Brand className="d-lg-sm d-none" onClick={home}>Holiday-Homes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={home}>Home</Nav.Link>
            <Nav.Link>
              <CategoryFilter />
            </Nav.Link>
            <NavDropdown title={user.username} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={userPage}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={newHolidayHomeForm}>Add a holiday home</NavDropdown.Item>
              <NavDropdown.Item onClick={favourites}>
                Favourites
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {showForm ? (
        <nav>
          <button data-toggle="collapse" data-target="#collapseTarget" aria-expanded="false" aria-controls="collapseExample" type="button" className="m-2 p-2 pl-3 pr-3 search-btn">
            <span className=""><i className="fa fa-search" aria-hidden="true" /></span>
          </button>
          <div id="collapseTarget" className="collapse m-5 p-5">
            <form onSubmit={search}>
              <input type="text" placeholder="Search by title" className="mr-sm-2 ml-sm-0 ml-n5 search-input" onChange={handleChange} />
              <button className="btn btn-primary mt-2" type="submit" aria-labelledby="button-label">Search</button>
            </form>

          </div>
        </nav>
      ) : null}
    </div>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  showFavourites: PropTypes.func.isRequired,
  showNewHolidayHome: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  showUser: PropTypes.func.isRequired,
  showForm: PropTypes.bool,
  showSearchResults: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

Header.defaultProps = {
  showForm: true,
};

export default connect(
  state => ({ user: state.user }), { logout },
)(Header);
