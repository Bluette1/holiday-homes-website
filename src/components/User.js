import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { useStateIfMounted } from 'use-state-if-mounted';

const User = ({ user, showUser }) => {
  const [resRedirect, setRedirect] = useStateIfMounted(false);
  const handleRedirect = e => {
    e.preventDefault();
    setRedirect(true);
    showUser(false);
  };
  return resRedirect ? <Redirect to="/" /> : (
    <div className="d-flex justify-content-center">
      <div className="pt-5 mt-5">
        <div>
          <h4>
            Name:&nbsp;
            {user.name}
          </h4>
          <h4>
            Username: &nbsp;
            {user.username}
          </h4>
          <h4>
            Email:&nbsp;
            {user.email}
          </h4>
        </div>
        <button type="submit" className="mt-5" onClick={handleRedirect}>Back</button>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  showUser: PropTypes.func.isRequired,
};

export default User;
