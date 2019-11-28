import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderCard from './orderCard';
import { Order } from '../types';
import '@testing-library/jest-dom/extend-expect';

const order: Order = {
  _id: '',
  status: 'processing',
  shipAddress: {
    zipCode: 'test',
    street: 'test',
    city: 'test',
    state: 'test'
  },
  totalPrice: 0,
  line: [
    {
      product: {
        name: 'product',
        description: 'description'
      },
      quantity: 1,
      price: 2,
      total: 2
    }
  ],
  customer: {
    name: 'customerName'
  }
};

test('print the Order passed as param', () => {
  const { getByText, container } = render(<OrderCard order={order} />);
  expect(getByText('customerName')).toBeVisible();
  expect(container.firstChild).toMatchSnapshot();
});

describe('Collapsible behaviour', () => {
  test('start collapsed', () => {
    const { getByText } = render(<OrderCard order={order} />);
    expect(
      getByText('Ship To').parentElement.parentElement.className
    ).toContain('is-hidden');
  });

  test('expand after click', () => {
    const { container } = render(<OrderCard order={order} />);
    const box = container.firstChild as HTMLElement;
    fireEvent.click(box);
    expect(box.children[1].className).not.toContain('is-hidden');
  });
});
