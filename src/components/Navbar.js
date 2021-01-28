import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CategoryFilter from './CategoryFilter';
import { logout } from '../actions/index';

const Header = ({
  logout, user, history, showFavourites, showNewHolidayHome, showDetails, showUser,
}) => {
  const home = e => {
    e.preventDefault();

    showFavourites(false);
    showNewHolidayHome(false);
    showDetails(false);
    history.push('/');
  };

  const favourites = e => {
    e.preventDefault();
    showNewHolidayHome(false);
    showDetails(false);
    showFavourites();
  };

  const newHolidayHomeForm = e => {
    e.preventDefault();

    showFavourites(false);
    showDetails(false);
    showNewHolidayHome();
  };

  const userPage = e => {
    e.preventDefault();

    showFavourites(false);
    showDetails(false);
    showNewHolidayHome(false);
    showUser();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={home}>Holiday-Homes</Navbar.Brand>
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
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  showFavourites: PropTypes.func.isRequired,
  showNewHolidayHome: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  showUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(connect(state => ({ user: state.user }), { logout })(Header));
