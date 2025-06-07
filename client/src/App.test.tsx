import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders taskmg text', () => {
  render(<App />);
  const linkElement = screen.getByText(/taskmg/i);
  expect(linkElement).toBeInTheDocument();
});
