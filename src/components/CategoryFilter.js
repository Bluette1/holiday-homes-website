import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { changeFilter } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

const CategoryFilter = ({ handleFilterChange }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${httpProtocol}://${host}:${port}/categories`)
      .then(response => {
        const categoryList = response.data.categories;
        setData(categoryList);
      });
  }, []);

  const holidayHomeCategories = ['All', ...data];
  return (
    <div className="category-filter">
      <select
        onChange={e => handleFilterChange(e.target.value)}
      >
        <option>CATEGORIES</option>
        {holidayHomeCategories.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

CategoryFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default connect(null, { handleFilterChange: changeFilter })(CategoryFilter);
