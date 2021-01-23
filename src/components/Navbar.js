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

const Header = ({ logout, user, history }) => {
  const redirect = (e, route) => {
    e.preventDefault();
    history.push(route);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={e => { redirect(e, '/'); }}>Holiday-Homes</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={e => { redirect(e, '/'); }}>Home</Nav.Link>
          <Nav.Link>
            <CategoryFilter />
          </Nav.Link>
          <NavDropdown title={user.username} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={e => { redirect(e, '/new_holiday_home'); }}>Add a holiday home</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Favourites</NavDropdown.Item>
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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(connect(state => ({ user: state.user }), { logout })(Header));
