import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItems from './cartItems';
import configureStore from 'redux-mock-store';
import mockStateData from '../../../__mocks__/mockStateData.json';
import { Provider } from 'react-redux';

const mockState = mockStateData;
const mockStore = configureStore([]);
const store = mockStore(mockState);

const inCartItems = store.getState().reducer.ProductReducer.cart;

describe('CartItems component', () => {
    beforeEach(() => {
        render(
          <Provider store={store}>
            <CartItems />
          </Provider>
        );
      });

  it('renders cart empty message when no items are in cart or the items', () => {

    if(!inCartItems) {
        expect(screen.getByText('Your cart is Empty!')).toBeInTheDocument();
    } else {
        inCartItems.map((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    }
  });

  it('renders all items in cart', () => {
    inCartItems.map((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
        expect(screen.getByText(item.quantity)).toBeInTheDocument();
    });
  });
});