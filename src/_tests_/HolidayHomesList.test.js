import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import HolidayHomesList from '../containers/HolidayHomesList';
import configureStore, { history } from '../store';
import { httpProtocol, host, port } from '../envVariables';

jest.mock('axios');

afterEach(cleanup);

const store = configureStore({
  user: { username: 'MaryS', authentication_token: 'token' },
});
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
    creator: {},
  },
];

const multipleData = [
  {
    holiday_home: holidayHomeOne,
    creator: {},
  },
  {
    holiday_home: holidayHomeTwo,
    creator: {},
  },
];
const showDetailsSpy = jest.fn();
const HolidayHomesListWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <ConnectedRouter history={history}>
        <HolidayHomesList
          showDetails={showDetailsSpy}
        />
      </ConnectedRouter>
    </React.StrictMode>
  </Provider>
);

test('renders the holiday homes list - when empty data is returned', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
        return Promise.resolve({ data: [] });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<HolidayHomesListWithStore />);
  await waitFor(() => {
    expect(screen.getByText('No holiday homes were found')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});

test('renders the holiday homes list - when single data is returned', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
        return Promise.resolve({ data });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<HolidayHomesListWithStore />);
  await waitFor(() => {
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
});

test('renders the holiday homes list - when multiple data is returned', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
        return Promise.resolve({ data: multipleData });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<HolidayHomesListWithStore />);
  await waitFor(() => {
    const imageContainers = document.querySelectorAll('.imgContainer');
    expect(imageContainers.length).toBe(2);
    const img = screen.queryAllByAltText('holiday home');
    expect(img[1]).toHaveAttribute('src', 'url');
    expect(img[0]).toHaveAttribute('src', 'url two');
    const rating = document.querySelectorAll('.fa.fa-star.checked');
    expect(rating.length).toBe(9);
    const price = screen.getAllByTestId('price');
    expect(price[1]).toHaveTextContent('$ 2000 per Month');
    expect(price[0]).toHaveTextContent('$ 1200 per Month');
    expect(img).toBeTruthy();
    expect(imageContainers[0]).toContainElement(img[0]);
    expect(imageContainers[1]).toContainElement(img[1]);
    expect(screen.getByText('Mount Hall')).toBeInTheDocument();
    expect(screen.getByText('Jumping Castle')).toBeInTheDocument();
    expect(screen.getByText('Mansion')).toBeInTheDocument();
    expect(screen.getByText('Country Home')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});

test('renders the holiday homes list - clicking an image displays the details', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/holiday_homes?search_params=`:
        return Promise.resolve({ data });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<HolidayHomesListWithStore />);
  await waitFor(() => {
    const img = screen.queryByAltText('holiday home');
    fireEvent.click(img);
    expect(showDetailsSpy).toHaveBeenCalled();
    expect(screen).toMatchSnapshot();
  });
});
