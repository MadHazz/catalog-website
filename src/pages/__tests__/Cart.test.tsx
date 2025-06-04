import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../Cart';
import { MemoryRouter } from 'react-router-dom';

describe('updateQuantity', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('limits the quantity between 1 and available stock', () => {
    const cartItem = {
      id: '1',
      name: 'Test',
      price: 10,
      category: 'cat',
      quantity: 5,
      image: '',
      description: '',
      features: [],
      weight: '1kg',
      selectedQuantity: 2,
    };
    localStorage.setItem('cart', JSON.stringify([cartItem]));
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '0' } });
    expect((input as HTMLInputElement).value).toBe('1');

    fireEvent.change(input, { target: { value: '10' } });
    expect((input as HTMLInputElement).value).toBe('5');
  });
});
