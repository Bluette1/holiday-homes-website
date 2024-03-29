import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { useStateIfMounted } from 'use-state-if-mounted';
import {
  cloudName,
} from '../envVariables';
import urlExists from '../urlExists';

const User = ({ user, showUser }) => {
  const [resRedirect, setRedirect] = useStateIfMounted(false);
  const handleRedirect = e => {
    e.preventDefault();
    setRedirect(true);
    showUser(false);
  };
  const baseImgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1611749658/`;

  let url = 'https://holiday-homes-project.s3.eu-north-1.amazonaws.com/profile-icon-png-910.png';
  if (user.photo_file_name && urlExists(`${baseImgUrl}${user.id}/thumb/${user.photo_file_name}`)) {
    url = `${baseImgUrl}${user.id}/thumb/${user.photo_file_name}`;
  }

  return resRedirect ? <Redirect to="/" /> : (
    <div className="d-flex justify-content-center">
      <div className="pt-5 mt-5">
        { url ? (
          <img src={url} alt="" style={{ borderRadius: '50%', margin: '15px' }} />
        ) : null}
        <>
          <p>
            Name:&nbsp;
            {user.name}
          </p>
          <p>
            Username: &nbsp;
            {user.username}
          </p>
          <p>
            Email:&nbsp;
            {user.email}
          </p>
        </>
        <button type="submit" className="mt-5 bg-primary text-light" onClick={handleRedirect}>Back</button>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  showUser: PropTypes.func.isRequired,
};

export default User;
