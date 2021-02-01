import React from 'react';
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import '@testing-library/jest-dom';
import axios from 'axios';
import CategoryFilter from '../components/CategoryFilter';
import configureStore, { history } from '../store';
import { httpProtocol, host, port } from '../envVariables';

jest.mock('axios');

afterEach(cleanup);

const store = configureStore({
  user: { username: 'MaryS', authentication_token: 'token' },
});

const CategoryFilterWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <ConnectedRouter history={history}><CategoryFilter /></ConnectedRouter>
    </React.StrictMode>
  </Provider>
);
const categories = [
  'Cottage',
  'Mansion',
  'Lodge',
  'Country home',
  'Chalet',
  'Log cabin',
];
test('renders the categoryFilter', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/categories`:
        return Promise.resolve({ data: { categories } });
      default:
        return Promise.resolve({ data: [] });
    }
  });

  render(<CategoryFilterWithStore />);
  await waitFor(() => {
    const categoryFilter = document.querySelector('.category-filter');
    expect(categoryFilter).toBeTruthy();

    const selectEl = screen.getByTestId('category-filter');
    expect(categoryFilter).toContainElement(selectEl);
    expect(categoryFilter).toContainHTML('<option>CATEGORIES</option>');

    expect(selectEl).toContainHTML('<option>CATEGORIES</option>');
    expect(selectEl).toContainHTML('<option value="All">All</option>');
    expect(selectEl).toContainHTML('<option value="Cottage">Cottage</option>');
    expect(selectEl).toContainHTML('<option value="Mansion">Mansion</option>');
    expect(selectEl).toContainHTML('<option value="Country home">Country home</option>');
    expect(selectEl).toContainHTML('<option value="Chalet">Chalet</option>');
    expect(selectEl).toContainHTML('<option value="Log cabin">Log cabin</option>');
    expect(categoryFilter).toMatchSnapshot();
  });
});
