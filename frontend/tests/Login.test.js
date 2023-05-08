import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Login from './Login';

jest.mock('axios'); // Mocking axios module

describe('Login component', () => {
  test('should handle successful login', async () => {
    const mockToken = 'mockToken';
    const mockResponse = {
      data: {
        token: mockToken,
      },
    };
    axios.post.mockResolvedValue(mockResponse); // Mocking axios post method

    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    // Fill in form inputs
    fireEvent.change(emailInput, { target: { value: 'ayanagrawal007@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Click login button
    fireEvent.click(loginButton);

    // Wait for API call and success alert
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:4000/auth/login',
        {
          email: 'ayanagrawal007@gmail.,com',
          password: '123456',
        }
      );
    });
    expect(document.cookie).toBe(`token=${mockToken}; path=/; SameSite=Strict`);
    expect(screen.getByText('Login successful!')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/datasets');
  });

  test('should handle login error', async () => {
    const mockErrorMessage = 'Invalid credentials';
    const mockError = {
      response: {
        data: {
          message: mockErrorMessage,
        },
      },
    };
    axios.post.mockRejectedValue(mockError); // Mocking axios post method

    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    // Fill in form inputs
    fireEvent.change(emailInput, { target: { value: 'ayanagrawal007@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    // Click login button
    fireEvent.click(loginButton);

    // Wait for API call and error alert
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:4000/auth/login',
        {
          email: 'ayanagrawal007@gmail.com',
          password: '123',
        }
      );
    });
    expect(screen.getByText('Oops...')).toBeInTheDocument();
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });
});
