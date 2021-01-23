import React from 'react';
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import App from '../components/App';
import configureStore, { history } from '../store';
import { httpProtocol, host, port } from '../envVariables';

jest.mock('axios');

afterEach(cleanup);

const store = configureStore({
  user: { username: 'MaryS', authentication_token: 'token' },
});

const AppWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <ConnectedRouter history={history}><App /></ConnectedRouter>
    </React.StrictMode>
  </Provider>
);
test('renders the app', async () => {
  axios.get.mockImplementation(url => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/categories`:
        return Promise.resolve({ data: { categories: [] } });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  render(<AppWithStore />);
  await waitFor(() => {
    const holidayHomesTitle = screen.getByText(/Holiday-Homes/i);
    expect(holidayHomesTitle).toBeInTheDocument();
  });
});
