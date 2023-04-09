import React, { useDispatch } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Quantity from './quantity';
import { CartProducts, Category, Product } from '../../../store/types/types';
import configureStore from 'redux-mock-store';
import mockStateData from '../../../__mocks__/mockStateData.json';
import { Provider } from 'react-redux';

const mockState = mockStateData;
const mockStore = configureStore([]);
const store = mockStore(mockState);

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('Quantity', () => {
  let product: CartProducts | Product;
  let onPropsUpdate: jest.Mock;
  let status: boolean;
  let variant: string;
  let props: any;

  let dispatchMock = jest.fn();

 

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  

  beforeEach(() => {
    product = {
      _id: '1',
      title: 'Test Product',
      price: 10,
      stock: 2,
      desc: 'Test Description',
      category: 'FRUITS' as Category,
      quantity: 0
    };
    onPropsUpdate = jest.fn();
    status = false;
    variant = 'test';
    props = { product, onPropsUpdate, status, variant };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with initial state of 0 quantity', () => {
    const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
    expect(getByText('0')).toBeInTheDocument();
  });

  it('should increase quantity when increment button is clicked', () => {
    const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);
    expect(onPropsUpdate).toHaveBeenCalledWith({ ...props, quantity: 1 });
  });

  it('should decrease quantity when decrement button is clicked', () => {
    const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
    const incrementButton = getByText('+');
    const decrementButton = getByText('-');
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(onPropsUpdate).toHaveBeenCalledWith({ ...props, quantity: 0 });
  });

  it('should not increase quantity beyond stock limit', async() => {
    const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
    const incrementButton = getByText('+');
    fireEvent.change(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(onPropsUpdate).toHaveBeenCalledWith({ ...props, quantity: 2 });
  });

  it('should not decrease quantity below 0', () => {
    const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
    const decrementButton = getByText('-');
    fireEvent.click(decrementButton);
    expect(onPropsUpdate).toHaveBeenCalledWith({ ...props, quantity: 0 });
  });

  it('should update quantity in props when quantity is changed', () => {
    const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);
    expect(onPropsUpdate).toHaveBeenCalledWith({ ...props, quantity: 1 });
  });

  it('should reset quantity to 0 when status is true', () => {
    props.status = true;
    const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
    expect(getByText('0')).toBeInTheDocument();
  });

//   it('should dispatch addToCart action when quantity is changed and variant is provided', () => {
//     props.variant = 'cart';
//     const dispatchMock = jest.fn();
//     const { getByText } = render(<Provider store={store}><Quantity {...props} /></Provider>);
//     const incrementButton = getByText('+');
//     fireEvent.click(incrementButton);
//     expect(dispatchMock).toHaveBeenCalledWith({
//       type: 'ADD_TO_CART',
//       payload: { product, quantity: 1, variant }
//     });
//   });
});