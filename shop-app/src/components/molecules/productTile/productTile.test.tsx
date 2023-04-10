import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ProductTile from './productTile';
import configureStore from 'redux-mock-store';
import mockStateData from '../../../__mocks__/mockStateData.json';
import { Provider } from 'react-redux';
import { CartProducts, Category, Product, TestState } from '../../../store/types/types';



const mockState = mockStateData;
const mockStore = configureStore([]);
const store: TestState | any = mockStore(mockState);
let product: Product;

describe('ProductTile', () => {
  product = store.getState()?.reducer.ProductReducer.products[0];
  beforeEach(() => {
    render(
        <Provider store={store}>
          <ProductTile product={product} />
        </Provider>
      );
  });

  it('renders product title', async() => {
    await waitFor(() => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('renders product description', async() => {
    await waitFor(() => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('renders product stock', async() => {
    await waitFor(() => {
        expect(screen.getByText(/Stock: 2/i)).toBeInTheDocument();
    });
  });

  it('renders quantity component', async() => {
    await waitFor(() => {
        expect(screen.getByTestId('mainQuantity')).toBeInTheDocument();
    });
  });

  it('renders add to cart button', async() => {
    await waitFor(() => {
        expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
    });
  });

  it('renders price', async() => {
    await waitFor(() => {
        expect(screen.getByText(/€ 7.99/i)).toBeInTheDocument();
    });
  });

  it('does not render add to cart button when stock is not available', async() => {
    
    const updatedProduct = {
        _id: "642899de1d0bfcc11aa6778a",
        title: "Washington Apple",
        desc: "Juicy red apples straight from United States of America",
        price: 7.99,
        stock: 0,
        category: "Fruits" as Category
    }

    const { queryByText } = render(
      <Provider store={store}>
        <ProductTile product={updatedProduct} />
      </Provider>
    );

    await waitFor(() => {
        expect(queryByText(/No Stock Available/i)).toBeInTheDocument();
    }) 
  });
});