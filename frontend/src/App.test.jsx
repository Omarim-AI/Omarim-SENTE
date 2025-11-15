import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByText(/OMARIM SOE/i);
    expect(heading).toBeInTheDocument();
  });
});
