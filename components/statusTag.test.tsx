import React from 'react';
import { render } from '@testing-library/react';
import StatusTag from './statusTag';
import '@testing-library/jest-dom/extend-expect';

test('print the status passed as param', () => {
  const { getByText, container } = render(<StatusTag status="status" />);
  expect(getByText('status')).toBeVisible();
  expect(container.firstChild).toMatchSnapshot();
});

describe('Uses the correct color class', () => {
  const mapping = {
    processing: 'warning',
    approved: 'success',
    anyOther: 'danger'
  };

  for (const [key, value] of Object.entries(mapping)) {
    const { container } = render(<StatusTag status={key} />);
    const statusElement = container.firstChild as HTMLElement;
    const className = statusElement.className;
    expect(className).toContain('is-' + value);
  }
});
