import { useStateIfMounted } from 'use-state-if-mounted';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import HolidayHomesList from './HolidayHomesList';

const SearchResultsList = ({ params, showSearchResults, showDetails }) => {
  const [resRedirect, setRedirect] = useStateIfMounted(false);
  const handleRedirect = e => {
    e.preventDefault();
    setRedirect(true);
    showSearchResults(false);
  };
  return resRedirect ? <Redirect to="/" /> : (
    <>
      <>
        <HolidayHomesList params={params} showDetails={showDetails} />
      </>
      <button type="submit" className="mt-5 ml-4" onClick={handleRedirect}>Back</button>
    </>

  );
};

SearchResultsList.propTypes = {
  params: PropTypes.string.isRequired,
  showSearchResults: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
};

export default SearchResultsList;
