import React from 'react';
import { render } from '@testing-library/react';
import ProductsTable from './productsTable';
import { Line } from '../types';
import '@testing-library/jest-dom/extend-expect';

const lines: Line[] = [
  {
    product: {
      name: 'product Name',
      description: 'description'
    },
    quantity: 1,
    price: 2,
    total: 2
  }
];

test('print the table passed as param', () => {
  const { getByText, container } = render(<ProductsTable lines={lines} />);

  expect(getByText('product Name')).toBeVisible();
  expect(container.firstChild).toMatchSnapshot();
});
