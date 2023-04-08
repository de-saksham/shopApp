import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Icons from './icon';

describe('Icons component', () => {
  const navigationMock = jest.fn();
  const cartMock = jest.fn();

  const props = {
    iconName: 'cart',
    locationType: 'header',
    text: 'test-text',
    activeCategory: 'test-category',
    navigation: navigationMock,
    cart: cartMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the icon image and text correctly', () => {
    render(<Icons {...props} />);

    const iconImage = screen.getByAltText(props.iconName);
    const textElement = screen.getByText(props.text);

    expect(iconImage).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('calls the navigation callback when the icon container is clicked', () => {
    render(<Icons {...props} />);

    const iconContainer = screen.getByTestId('icon-container');
    fireEvent.click(iconContainer);

    expect(navigationMock).toHaveBeenCalledWith(props.text);
  });

  it('calls the cart callback when the icon div is clicked', () => {
    render(<Icons {...props} />);

    const iconDiv = screen.getByTestId('icon-div');
    fireEvent.click(iconDiv);

    expect(cartMock).toHaveBeenCalled();
  });

  it('renders the text as h4 when locationType is header', () => {
    render(<Icons {...props} />);

    const textElement = screen.getByText(props.text);

    expect(textElement.tagName).toBe('H4');
  });

  it('renders the text as h5 when locationType is not header', () => {
    const modifiedProps = { ...props, locationType: 'not-header' };

    render(<Icons {...modifiedProps} />);

    const textElement = screen.getByText(props.text);

    expect(textElement.tagName).toBe('H5');
  });

  it('adds the activeCategory class to the text element when text matches activeCategory', () => {
    render(<Icons {...props} />);

    const textElement = screen.getByText(props.text);

    expect(textElement.classList.contains('activeCategory')).toBe(true);
  });

  it('adds the inactiveCategory class to the text element when text does not match activeCategory', () => {
    const modifiedProps = { ...props, activeCategory: 'different-category' };

    render(<Icons {...modifiedProps} />);

    const textElement = screen.getByText(props.text);

    expect(textElement.classList.contains('inactiveCategory')).toBe(true);
  });
});