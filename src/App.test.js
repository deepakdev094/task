import { render, screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './store/utils/utils-for-tests';

test('renders learn react link', () => {
  renderWithProviders(<App />);
});
