import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import HolidayHomeDetails from '../components/HolidayHomeDetails';
import configureStore, { history } from '../store';
import { httpProtocol, host, port } from '../envVariables';

jest.mock('axios');
jest.mock('../urlExists');

afterEach(cleanup);

const store = configureStore({
  user: { username: 'MaryS', authentication_token: 'token' },
});
const holidayHome = {
  id: 'id',
  title: 'Mount Hall',
  category: 'Mansion',
  price: '2000',
  rating: 5,
  image_url: 'url',
  description: 'lorem ipsum...',
};

const holidayHomeObj = {
  holiday_home: holidayHome,
  creator: { name: 'Sarah Moor' },
};

const favouriteId = null;
const showDetailsSpy = jest.fn();
const HolidayHomeDetailsWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <ConnectedRouter history={history}>
        <HolidayHomeDetails
          holidayHomeObj={holidayHomeObj}
          favouriteId={favouriteId}
          showDetails={showDetailsSpy}
        />
      </ConnectedRouter>
    </React.StrictMode>
  </Provider>
);

test('renders the holiday home details', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
        return Promise.resolve({ data: [holidayHomeObj] });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<HolidayHomeDetailsWithStore />);
  await waitFor(() => {
    const img = screen.queryByAltText('holiday home');
    expect(img).toHaveAttribute('src', 'https://projectbucket-223.s3.us-east-2.amazonaws.com/user.png');
    const rating = document.querySelectorAll('.fa.fa-star.checked');
    expect(rating.length).toBe(5);
    const price = screen.getByTestId('price');
    expect(price).toHaveTextContent('$ 2000 per Month');
    expect(img).toBeTruthy();
    expect(screen.getByText('Mount Hall')).toBeInTheDocument();
    expect(screen).toMatchSnapshot('lorem ipsum...');
  });
});

test('renders the holiday home details - user can add favourites ', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
        return Promise.resolve({ data: [holidayHomeObj] });
      default:
        return Promise.resolve({ data: [] });
    }
  });

  axios.post.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes/${holidayHome.id}/favourites`:
        return Promise.resolve({ data: { holiday_home: holidayHome, id: 'fvId' } });
      default:
        return Promise.resolve({ data: [] });
    }
  });

  render(<HolidayHomeDetailsWithStore />);
  await waitFor(() => {
    const bgImg = document.querySelector('.image-area');
    expect(bgImg).toBeTruthy();
    expect(bgImg).toHaveStyle('backgroundImage: url(url)');
    const img = screen.queryByAltText('holiday home');
    expect(img).toHaveAttribute('src', 'https://projectbucket-223.s3.us-east-2.amazonaws.com/user.png');
    const rating = document.querySelectorAll('.fa.fa-star.checked');
    expect(rating.length).toBe(5);
    const price = screen.getByTestId('price');
    expect(price).toHaveTextContent('$ 2000 per Month');
    expect(img).toBeTruthy();
    expect(screen.getByText('Mount Hall')).toBeInTheDocument();
    expect(screen).toMatchSnapshot('lorem ipsum...');
    const moreBtn = screen.getByRole('button', { name: 'More...' });
    fireEvent.click(moreBtn);
    const addToFavouritesItem = screen.getByRole('button', { name: 'Add to favourites' });
    fireEvent.click(addToFavouritesItem);
    expect(addToFavouritesItem).toBeTruthy();
  });
});

describe("test that 'add/remove favorite' toggles as expected", () => {
  beforeEach(async () => {
    axios.get.mockImplementation(url => {
      switch (url) {
        case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
          return Promise.resolve({ data: [holidayHomeObj] });
        default:
          return Promise.resolve({ data: [] });
      }
    });

    render(<HolidayHomeDetailsWithStore />);
    await waitFor(() => {
      const bgImg = document.querySelector('.image-area');
      expect(bgImg).toBeTruthy();
      expect(bgImg).toHaveStyle('backgroundImage: url(url)');
      const img = screen.queryByAltText('holiday home');
      expect(img).toHaveAttribute('src', 'https://projectbucket-223.s3.us-east-2.amazonaws.com/user.png');
      const rating = document.querySelectorAll('.fa.fa-star.checked');
      expect(rating.length).toBe(5);
      const price = screen.getByTestId('price');
      expect(price).toHaveTextContent('$ 2000 per Month');
      expect(img).toBeTruthy();
      expect(screen.getByText('Mount Hall')).toBeInTheDocument();
      expect(screen).toMatchSnapshot('lorem ipsum...');
      const moreBtn = screen.getByRole('button', { name: 'More...' });
      fireEvent.click(moreBtn);

      const addToFavouritesItem = screen.getByRole('button', { name: 'Add to favourites' });
      axios.post.mockImplementation(url => {
        switch (url) {
          case `${httpProtocol}://${host}:${port}/holiday_homes/${holidayHome.id}/favourites`:
            return Promise.resolve({ data: { holiday_home: holidayHome, id: 'fvId' } });
          default:
            return undefined;
        }
      });
      fireEvent.click(addToFavouritesItem);
      expect(addToFavouritesItem).toBeTruthy();
    });
  });
  test('renders the holiday home details - user can remove favourites ', async () => {
    const removeFromFavouritesItem = screen.getByRole('button', { name: 'Remove from favourites' });
    axios.delete.mockImplementation(url => {
      switch (url) {
        case `${httpProtocol}://${host}:${port}/favourites/fvId`:
          return Promise.resolve({ data: {} });
        default:
          return undefined;
      }
    });
    fireEvent.click(removeFromFavouritesItem);
    await waitFor(() => {
      expect(removeFromFavouritesItem).toBeTruthy();
    });
  });
});

test('renders the holiday home details with default background image url if image url is invalid', async () => {
  holidayHomeObj.holiday_home.image_url = 'ur';
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
        return Promise.resolve({ data: [holidayHomeObj] });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<HolidayHomeDetailsWithStore />);
  await waitFor(() => {
    const bgImg = document.querySelector('.image-area');
    expect(bgImg).toBeTruthy();
    expect(bgImg).toHaveStyle('backgroundImage: url(https://projectbucket-223.s3.us-east-2.amazonaws.com/home_image.png)');
    const img = screen.queryByAltText('holiday home');
    expect(img).toHaveAttribute('src', 'https://projectbucket-223.s3.us-east-2.amazonaws.com/user.png');
    const rating = document.querySelectorAll('.fa.fa-star.checked');
    expect(rating.length).toBe(5);
    const price = screen.getByTestId('price');
    expect(price).toHaveTextContent('$ 2000 per Month');
    expect(img).toBeTruthy();
    expect(screen.getByText('Mount Hall')).toBeInTheDocument();
    expect(screen).toMatchSnapshot('lorem ipsum...');
  });
});
