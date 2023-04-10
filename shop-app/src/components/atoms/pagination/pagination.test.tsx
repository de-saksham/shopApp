import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './pagination';
import configureStore from 'redux-mock-store';
import mockStateData from '../../../__mocks__/mockStateData.json';
import { Provider } from 'react-redux';
import { TestState } from '../../../store/types/types';

const mockState = mockStateData;
const mockStore = configureStore([]);
const store: TestState | any = mockStore(mockState);

describe('Pagination component', () => {
    beforeEach(() => {
        render(
          <Provider store={store}>
            <Pagination />
          </Provider>
        );
    });

  it('renders previous and next buttons', () => {
    const prevButton = screen.getByRole('img', { name: 'back' });
    expect(prevButton).toBeInTheDocument();

    const nextButton = screen.getByRole('img', { name: 'next' });
    expect(nextButton).toBeInTheDocument();
  });

  it('dispatches updateCurrentPage action on previous and next button click', () => {
    const prevButton = screen.getByRole('img', { name: 'back' });
    const nextButton = screen.getByRole('img', { name: 'next' });

    fireEvent.click(nextButton);
    expect(store.getState()?.reducer.ProductReducer.currentPage).toBe(1);

    fireEvent.click(prevButton);
    expect(store.getState()?.reducer.ProductReducer.currentPage).toBe(1);
  });

  it('does not dispatch updateCurrentPage action on click of previous or next button when currentPage is at first or last page', () => {
    const prevButton = screen.getByRole('img', { name: 'back' });
    const nextButton = screen.getByRole('img', { name: 'next' });

    fireEvent.click(prevButton); // This should not dispatch any action since currentPage is 1
    expect(store.getState()?.reducer.ProductReducer.currentPage).toBe(1);

    const totalPages = Math.ceil(store.getState()?.reducer.ProductReducer.products.length / 10);

    for(let i=1; i<totalPages; i++){
      fireEvent.click(nextButton); // This should not dispatch any action since currentPage is at the last page
    }
    expect(store.getState()?.reducer.ProductReducer.currentPage).toBe(totalPages);
  });
});