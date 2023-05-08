import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddGraphs from './AddGraphs';

jest.mock('axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve()),
}));

describe('AddGraphs', () => {
  test('should render dataset table and graph creation form', async () => {
    const mockTableRows = ['ID', 'Name', 'Age'];
    const mockValues = [
      { ID: 1, Name: 'John', Age: 25 },
      { ID: 2, Name: 'Jane', Age: 30 },
    ];
    axios.get.mockResolvedValueOnce({ data: { fields: mockTableRows, data: mockValues } });

    render(<AddGraphs />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets/dataset_id', {
        headers: {
          Authorization: 'Bearer fakeToken',
        },
      });
    });
    expect(screen.getByText('Dataset')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Create Graph')).toBeInTheDocument();
    expect(screen.getByLabelText('X-Axis')).toBeInTheDocument();
    expect(screen.getByLabelText('Y-Axis')).toBeInTheDocument();
    expect(screen.getByLabelText('Graph Type')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Graph' })).toBeInTheDocument();
    expect(Swal.fire).not.toHaveBeenCalled();
  });

  test('should display error message when API request fails', async () => {
    axios.get.mockRejectedValueOnce({ response: { data: { message: 'Error retrieving dataset' } } });

    render(<AddGraphs />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets/dataset_id', {
        headers: {
          Authorization: 'Bearer fakeToken',
        },
      });
    });
    expect(screen.queryByText('Dataset')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('X-Axis')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Y-Axis')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Graph Type')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Generate Graph' })).not.toBeInTheDocument();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Oops...',
      text: 'Error retrieving dataset',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  });

  test('should display error message when form is submitted with missing options', async () => {
    render(<AddGraphs />);

    const generateGraphButton = screen.getByRole('button', { name: 'Generate Graph' });
    fireEvent.click(generateGraphButton);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Oops...',
        text: 'Please select all options!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
    expect(axios.post).not.toHaveBeenCalled();
  });
});
