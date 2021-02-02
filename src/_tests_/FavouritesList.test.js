import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import FavouritesList from '../containers/FavouritesList';
import configureStore, { history } from '../store';
import { httpProtocol, host, port } from '../envVariables';

jest.mock('axios');

afterEach(cleanup);
const holidayHomeOne = {
  title: 'Mount Hall',
  category: 'Mansion',
  price: '2000',
  rating: 5,
  image_url: 'url',
  description: 'lorem ipsum...',
};

const holidayHomeTwo = {
  title: 'Jumping Castle',
  category: 'Country Home',
  price: '1200',
  rating: 4,
  image_url: 'url two',
  description: 'lorem ipsum... two',
};
const data = [
  {
    holiday_home: holidayHomeOne,
    id: 'id',
  },
];

const multipleData = [
  {
    holiday_home: holidayHomeOne,
    id: 'id',
  },
  {
    holiday_home: holidayHomeTwo,
    id: 'id two',
  },
];

test('renders the favourites list of holiday homes - when empty data is returned', () => {
  const store = configureStore({
    user: { username: 'MaryS', authentication_token: 'token' },
    favourites: [],
  });
  const showDetailsSpy = jest.fn();
  const showFavouritesSpy = jest.fn();
  const FavouritesListWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <ConnectedRouter history={history}>
          <FavouritesList
            showFavourites={showFavouritesSpy}
            showDetails={showDetailsSpy}
          />

        </ConnectedRouter>
      </React.StrictMode>
    </Provider>
  );
  render(<FavouritesListWithStore />);
  expect(screen.getByText('No favourites were found.')).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
});

test('renders the favourites list of holiday homes - when single data is returned', () => {
  const store = configureStore({
    user: { username: 'MaryS', authentication_token: 'token' },
    favourites: data,
  });
  const showDetailsSpy = jest.fn();
  const showFavouritesSpy = jest.fn();
  const FavouritesListWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <ConnectedRouter history={history}>
          <FavouritesList
            showFavourites={showFavouritesSpy}
            showDetails={showDetailsSpy}
          />

        </ConnectedRouter>
      </React.StrictMode>
    </Provider>
  );
  render(<FavouritesListWithStore />);
  const imageContainer = document.querySelector('.imgContainer');
  const img = screen.queryByAltText('holiday home');
  expect(img).toHaveAttribute('src', 'url');
  const rating = document.querySelectorAll('.fa.fa-star.checked');
  expect(rating.length).toBe(5);
  const price = screen.getByTestId('price');
  expect(price).toHaveTextContent('$ 2000 per Month');
  expect(img).toBeTruthy();
  expect(imageContainer).toContainElement(img);
  expect(screen.getByText('Mount Hall')).toBeInTheDocument();
  expect(screen.getByText('Mansion')).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
});

test('renders the favourites list of holiday homes - when multiple data is returned', () => {
  const store = configureStore({
    user: { username: 'MaryS', authentication_token: 'token' },
    favourites: multipleData,
  });
  const showDetailsSpy = jest.fn();
  const showFavouritesSpy = jest.fn();
  const FavouritesListWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <ConnectedRouter history={history}>
          <FavouritesList
            showFavourites={showFavouritesSpy}
            showDetails={showDetailsSpy}
          />
        </ConnectedRouter>
      </React.StrictMode>
    </Provider>
  );
  render(<FavouritesListWithStore />);
  const imageContainers = document.querySelectorAll('.imgContainer');
  expect(imageContainers.length).toBe(2);
  const img = screen.queryAllByAltText('holiday home');
  expect(img[1]).toHaveAttribute('src', 'url two');
  expect(img[0]).toHaveAttribute('src', 'url');
  const rating = document.querySelectorAll('.fa.fa-star.checked');
  expect(rating.length).toBe(9);
  const price = screen.getAllByTestId('price');
  expect(price[1]).toHaveTextContent('$ 1200 per Month');
  expect(price[0]).toHaveTextContent('$ 2000 per Month');
  expect(img).toBeTruthy();
  expect(imageContainers[0]).toContainElement(img[0]);
  expect(imageContainers[1]).toContainElement(img[1]);
  expect(screen.getByText('Mount Hall')).toBeInTheDocument();
  expect(screen.getByText('Jumping Castle')).toBeInTheDocument();
  expect(screen.getByText('Mansion')).toBeInTheDocument();
  expect(screen.getByText('Country Home')).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
});

test('renders the favourites list of holiday homes - clicking an image displays the details', () => {
  const store = configureStore({
    user: { username: 'MaryS', authentication_token: 'token' },
    favourites: data,
  });
  const showDetailsSpy = jest.fn();
  const showFavouritesSpy = jest.fn();
  const FavouritesListWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <ConnectedRouter history={history}>
          <FavouritesList
            showFavourites={showFavouritesSpy}
            showDetails={showDetailsSpy}
          />

        </ConnectedRouter>
      </React.StrictMode>
    </Provider>
  );
  render(<FavouritesListWithStore />);
  const img = screen.queryByAltText('holiday home');
  fireEvent.click(img);
  expect(showDetailsSpy).toHaveBeenCalled();
  expect(screen).toMatchSnapshot();
});

test('renders the favourites list of holiday homes - user can remove a favourite', async () => {
  const store = configureStore({
    user: { username: 'MaryS', authentication_token: 'token' },
    favourites: data,
  });
  const showDetailsSpy = jest.fn();
  const showFavouritesSpy = jest.fn();
  const FavouritesListWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <ConnectedRouter history={history}>
          <FavouritesList
            showFavourites={showFavouritesSpy}
            showDetails={showDetailsSpy}
          />

        </ConnectedRouter>
      </React.StrictMode>
    </Provider>
  );
  render(<FavouritesListWithStore />);
  const moreBtn = screen.getByRole('button', { name: 'More...' });
  fireEvent.click(moreBtn);
  const removeFromFavouritesItem = screen.getByRole('button', { name: 'Remove from favourites' });
  expect(removeFromFavouritesItem).toBeTruthy();
  axios.delete.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/favourites/id`:
        return Promise.resolve({ data: {} });
      default:
        return undefined;
    }
  });
  fireEvent.click(removeFromFavouritesItem);
  await waitFor(() => {
    expect(screen.getByText('No favourites were found.')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
