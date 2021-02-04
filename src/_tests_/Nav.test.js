import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import configureStore, { history } from '../store';
import { httpProtocol, host, port } from '../envVariables';

jest.mock('axios');

afterEach(cleanup);

const store = configureStore({
  user: { username: 'MaryS', authentication_token: 'token' },
});

const showFavouritesSpy = jest.fn();
const showNewHolidayHomeSpy = jest.fn();
const showDetailsSpy = jest.fn();
const showUserSpy = jest.fn();
const showSearchResultsSpy = jest.fn();
const NavbarWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <ConnectedRouter history={history}>
        <Navbar
          showFavourites={showFavouritesSpy}
          showNewHolidayHome={showNewHolidayHomeSpy}
          showDetails={showDetailsSpy}
          showUser={showUserSpy}
          showSearchResults={showSearchResultsSpy}
        />
      </ConnectedRouter>
    </React.StrictMode>
  </Provider>
);

test('renders the navbar - expected data is returned', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/categories`:
        return Promise.resolve({ data: { categories: [] } });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<NavbarWithStore />);
  await waitFor(() => {
    const categoryFilter = document.querySelector('.category-filter');
    expect(categoryFilter).toBeTruthy();
    const usernameBtn = screen.getByRole('button', { name: 'MaryS' });
    expect(usernameBtn).toBeInTheDocument();
    const homeBtn = screen.getByRole('button', { name: 'Home' });
    expect(homeBtn).toBeInTheDocument();
    const searchForm = screen.getByPlaceholderText('Search by title');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    expect(searchForm).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

test('renders the navbar - expected data is returned and toggle buttons working correctly', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/categories`:
        return Promise.resolve({ data: { categories: [] } });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<NavbarWithStore />);
  await waitFor(() => {
    const categoryFilter = document.querySelector('.category-filter');
    expect(categoryFilter).toBeTruthy();
    const usernameBtn = screen.getByRole('button', { name: 'MaryS' });
    expect(usernameBtn).toBeInTheDocument();
    fireEvent.click(usernameBtn);
    expect(usernameBtn).toBeDefined();

    const profileItem = screen.getByRole('button', { name: 'Profile' });
    expect(profileItem).toBeInTheDocument();

    const addHolidayHomeItem = screen.getByRole('button', { name: 'Add a holiday home' });
    expect(addHolidayHomeItem).toBeInTheDocument();

    const logoutItem = screen.getByRole('button', { name: 'Logout' });
    expect(logoutItem).toBeInTheDocument();

    const favouritesItem = screen.getByRole('button', { name: 'Favourites' });
    expect(favouritesItem).toBeInTheDocument();

    expect(screen).toMatchSnapshot();

    const homeBtn = screen.getByRole('button', { name: 'Home' });
    expect(homeBtn).toBeInTheDocument();
    const searchForm = screen.getByPlaceholderText('Search by title');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    expect(searchForm).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

test('renders the navbar - the expanded buttons function as expected when clicked', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/categories`:
        return Promise.resolve({ data: { categories: [] } });
      default:
        return Promise.resolve({ data: [] });
    }
  });

  render(<NavbarWithStore />);
  await waitFor(() => {
    const searchInput = screen.getByPlaceholderText('Search by title');
    const value = 'Courts';
    fireEvent.change(searchInput, { target: { value } });
    expect(searchInput.value).toBe(value);
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchBtn);
    expect(showSearchResultsSpy).toHaveBeenCalled();
    expect(showSearchResultsSpy).toHaveBeenCalledWith(true, value);

    const usernameBtn = screen.getByRole('button', { name: 'MaryS' });
    fireEvent.click(usernameBtn);

    const profileItem = screen.getByRole('button', { name: 'Profile' });
    fireEvent.click(profileItem);
    expect(showUserSpy).toHaveBeenCalled();

    const addHolidayHomeItem = screen.getByRole('button', { name: 'Add a holiday home' });

    fireEvent.click(addHolidayHomeItem);
    expect(showNewHolidayHomeSpy).toHaveBeenCalled();

    const favouritesItem = screen.getByRole('button', { name: 'Favourites' });
    fireEvent.click(favouritesItem);
    expect(showFavouritesSpy).toHaveBeenCalled();
    expect(screen).toMatchSnapshot();
  });
});

test('renders the navbar - with the logout button working as expected', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/categories`:
        return Promise.resolve({ data: { categories: [] } });
      default:
        return Promise.resolve({ data: [] });
    }
  });

  render(<NavbarWithStore />);
  await waitFor(() => {
    const usernameBtn = screen.getByRole('button', { name: 'MaryS' });
    fireEvent.click(usernameBtn);
    const logoutItem = screen.getByRole('button', { name: 'Logout' });
    expect(logoutItem).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
