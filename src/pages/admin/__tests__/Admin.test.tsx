import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminLogin from '../Login';
import AdminSignup from '../Signup';

describe('Admin pages', () => {
  it('renders login page heading', () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
  });

  it('renders signup page heading', () => {
    render(
      <MemoryRouter>
        <AdminSignup />
      </MemoryRouter>
    );
    expect(screen.getByText('Admin Signup')).toBeInTheDocument();
  });
});
