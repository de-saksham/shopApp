import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Header from './header';

import configureStore from 'redux-mock-store';
import mockStateData from '../../../__mocks__/mockStateData.json';
import { Provider } from 'react-redux';

const mockState = mockStateData;
const mockStore = configureStore([]);
const store = mockStore(mockState);

describe('Header component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  it('should render the component without errors', async() => {
    await waitFor(() => {
        expect(screen.getByTestId('header-container')).toBeInTheDocument();
    });
  });

  it('should display user name in header', async() => {
    await waitFor(() => {
        expect(screen.getByText('Welcome, Saksham!')).toBeInTheDocument();
    });
  });

  it('should display cart icon and trigger modal on click', async() => {
    const cartIcon = screen.getByRole('img', { name: 'cart' });

    expect(cartIcon).toBeInTheDocument();
    fireEvent.click(cartIcon);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'IS_MODAL_ACTIVE' }]);
  });
});