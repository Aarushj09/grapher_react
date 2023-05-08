import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Datasets from './Datasets';

jest.mock('axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve()),
}));

describe('Datasets', () => {
  test('should render datasets when the user is authenticated', async () => {
    const mockDatasets = [
      { dataset_name: 'dataset1.csv' },
      { dataset_name: 'dataset2.csv' },
    ];
    axios.get.mockResolvedValueOnce({ data: { datasets: mockDatasets } });

    render(<Datasets />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets', {
        headers: {
          Authorization: 'Bearer fakeToken',
        },
      });
    });
    expect(screen.getByText('My Datasets')).toBeInTheDocument();
    expect(screen.getByText('dataset1.csv')).toBeInTheDocument();
    expect(screen.getByText('dataset2.csv')).toBeInTheDocument();
    expect(screen.queryByText('You are not logged in!')).not.toBeInTheDocument();
    expect(Swal.fire).not.toHaveBeenCalled();
  });

  test('should display error message and redirect to login page when API request fails', async () => {
    axios.get.mockRejectedValueOnce({ response: { data: { message: 'Error retrieving datasets' } } });

    render(<Datasets />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets', {
        headers: {
          Authorization: 'Bearer fakeToken',
        },
      });
    });
    expect(screen.getByText('You are not logged in!')).toBeInTheDocument();
    expect(screen.queryByText('My Datasets')).not.toBeInTheDocument();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Oops...',
      text: 'Error retrieving datasets',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    expect(window.location.pathname).toBe('/login');
  });

  test('should redirect to graphs page when a dataset is clicked', async () => {
    const mockDatasets = [
      { dataset_name: 'dataset1.csv' },
      { dataset_name: 'dataset2.csv' },
    ];
    axios.get.mockResolvedValueOnce({ data: { datasets: mockDatasets } });

    render(<Datasets />);

    const dataset1 = screen.getByText('dataset1.csv');
    fireEvent.click(dataset1);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dataset1/graphs');
    });
  });
});
