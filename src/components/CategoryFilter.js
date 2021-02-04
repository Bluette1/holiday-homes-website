import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import axios from 'axios';
import { changeFilter, registerCategories } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

const CategoryFilter = ({ handleFilterChange, registerCategories }) => {
  const [data, setData] = useStateIfMounted([]);
  useEffect(() => {
    axios.get(`${httpProtocol}://${host}:${port}/categories`)
      .then(response => {
        const categoryList = response.data.categories;
        registerCategories(categoryList);
        setData(categoryList);
      });
  }, []);

  const holidayHomeCategories = ['All', ...data];
  return (
    <>
      <select
        className="category-filter"
        data-testid="category-filter"
        onChange={e => handleFilterChange(e.target.value)}
      >
        <option>CATEGORIES</option>
        {holidayHomeCategories.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

CategoryFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  registerCategories: PropTypes.func.isRequired,
};

export default connect(
  null, { handleFilterChange: changeFilter, registerCategories },
)(CategoryFilter);
