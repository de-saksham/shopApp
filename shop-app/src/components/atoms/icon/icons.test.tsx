import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Icons from './icon';
import { Category } from '../../../store/types/types';
import configureStore from 'redux-mock-store';
import mockStateData from '../../../__mocks__/mockStateData.json';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import * as ShallowRenderer from 'react-test-renderer/shallow';

const mockState = mockStateData;
const mockStore = configureStore([]);
const store = mockStore(mockState);
configure({ adapter: new Adapter() });


describe('Icons - Test Suite', () => {
    let shallowRenderer: any;

    beforeEach(() => {
        shallowRenderer = ShallowRenderer.createRenderer();
    });

    test('Snapshot', () => {
        shallowRenderer.render(
            <Provider store={store}>
                <Icons iconName='back' locationType='header' text='' />
            </Provider>
        );
        expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
    });
});

describe('Icons - Header', () => {
  const mockNavigation = jest.fn();
  const mockCart = jest.fn();

  const defaultProps = {
    iconName: 'cart',
    locationType: 'header',
    text: 'Mock Text',
    activeCategory: 'VEGETABLES' as Category,
    navigation: mockNavigation,
    cart: mockCart,
  };

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Icons  {...defaultProps}/>
      </Provider>
    );
  });

  it('renders icon', async() => {
    await waitFor(() => {
        expect(screen.getByAltText('cart')).toBeInTheDocument();
    });
  });

  it('renders header text', async() => {
    await waitFor(() => {
        expect(screen.getByText('Mock Text')).toBeInTheDocument();
    });
  });

  it('renders navigation text', async() => {
    await waitFor(() => {
        expect(screen.getByText('Mock Text')).toBeInTheDocument();
    });
  });

  it('renders active category text', async() => {
    await waitFor(() => {
        expect(screen.getByText('Mock Text')).toHaveClass('h4');
    });
  });

  it('calls navigation function on click', async() => {
    await waitFor(() => {
        fireEvent.click(screen.getByText('Mock Text'));
        expect(mockNavigation).toHaveBeenCalledWith('Mock Text');
    });
  });

  it('calls cart function on click', async() => {
    await waitFor(() => {
        fireEvent.click(screen.getByAltText('cart'));
        expect(mockCart).toHaveBeenCalled();
    });
  });
});

describe('Icons - Header', () => {
    const mockNavigation = jest.fn();
    const mockCart = jest.fn();

    const defaultProps = {
      iconName: 'cart',
      locationType: 'nav',
      text: 'Fruits',
      navigation: mockNavigation,
      cart: mockCart,
    };
  
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Icons  {...defaultProps}/>
        </Provider>
      );
    });

    it('renders active category text', async() => {
        await waitFor(() => {
            expect(screen.getByText('Fruits')).toBeInTheDocument();
        });
      });

    
    it('should render the category as active if it is the activeCategory', async() => {
        await waitFor(() => {
            expect(screen.getByText('Fruits')).toHaveClass('activeCategory');
        });
    });  
  
    it('should render the category as inactive if it is not the activeCategory', async() => {
        const { getByText } = render(<Provider store={store}><Icons text={'Vegetables'} locationType='nav' iconName='cart' /></Provider>);
        await waitFor(() => {
            const category = getByText('Vegetables');
            expect(category).toHaveClass('inactiveCategory');
        });
    });
  });