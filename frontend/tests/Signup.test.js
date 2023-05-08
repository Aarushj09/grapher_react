import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Signup from './Signup';

jest.mock('axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve()),
}));

describe('Signup', () => {
  test('should submit the form with valid user data', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'fakeToken' } });

    render(<Signup />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email ID');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/auth/signup', {
        username: 'testuser',
        email: 'test@gmail.com',
        password: 'testpassword',
      });
    });
    expect(document.cookie).toBe('token=fakeToken; path=/; SameSite=Strict');
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Success!',
      text: 'Signup successful!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    expect(window.location.pathname).toBe('/datasets');
  });

  test('should display error message for invalid email', async () => {
    render(<Signup />);

    const emailInput = screen.getByPlaceholderText('Email ID');
    const registerButton = screen.getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Oops...',
        text: 'Please enter a valid email ID!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
    expect(axios.post).not.toHaveBeenCalled();
    expect(window.location.pathname).toBe('/');
  });

  test('should display error message for failed signup', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Signup failed' } } });

    render(<Signup />);

    const registerButton = screen.getByText('Register');

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Oops...',
        text: 'Signup failed',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
    expect(window.location.pathname).toBe('/');
  });
});
