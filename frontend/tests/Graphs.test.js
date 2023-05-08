import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Graphs from './Graphs';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Graphs', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ dataset_id: '123' });
  });

  test('should render graphs', async () => {
    const mockTableRows = ['ID', 'Name', 'Age'];
    const mockValues = [
      { ID: 1, Name: 'John', Age: 25 },
      { ID: 2, Name: 'Jane', Age: 30 },
    ];
    const mockGraphs = [
      { graph_type: 'bar', x_axis: 'Name', y_axis: 'Age' },
      { graph_type: 'pie', x_axis: 'ID', y_axis: 'Age' },
    ];
    axios.get.mockResolvedValueOnce({ data: { fields: mockTableRows, data: mockValues } });
    axios.get.mockResolvedValueOnce({ data: { graphs: mockGraphs } });

    render(<Graphs />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets/123', {
        headers: {
          Authorization: 'Bearer fakeToken',
        },
      });
    });
    expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets/123/graphs', {
      headers: {
        Authorization: 'Bearer fakeToken',
      },
    });
    expect(screen.getByText('Graphs')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Graph' })).toBeInTheDocument();
    expect(screen.getByText('Loading graphs...')).toBeInTheDocument();
    expect(screen.queryByLabelText('X-Axis')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Y-Axis')).not.toBeInTheDocument();
    expect(screen.queryByRole('graphics')).not.toBeInTheDocument();
  });

  test('should display error message when API request fails', async () => {
    axios.get.mockRejectedValueOnce({ response: { data: { message: 'Error retrieving dataset' } } });

    render(<Graphs />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets/123', {
        headers: {
          Authorization: 'Bearer fakeToken',
        },
      });
    });
    expect(axios.get).not.toHaveBeenCalledWith('http://localhost:4000/datasets/123/graphs', {
      headers: {
        Authorization: 'Bearer fakeToken',
      },
    });
    expect(screen.queryByText('Graphs')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add Graph' })).not.toBeInTheDocument();
    expect(screen.queryByText('Loading graphs...')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('X-Axis')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Y-Axis')).not.toBeInTheDocument();
    expect(screen.queryByRole('graphics')).not.toBeInTheDocument();
  });

  test('should render graphs when API request succeeds', async () => {
    const mockTableRows = ['ID', 'Name', 'Age'];
    const mockValues = [
      { ID: 1, Name: 'John', Age: 25 },
      { ID: 2, Name: 'Jane', Age: 30 },
    ];
    const mockGraphs = [
      { graph_type: 'bar', x_axis: 'Name', y_axis: 'Age' },
      { graph_type: 'pie', x_axis: 'ID', y_axis: 'Age' },
    ];
    axios.get.mockResolvedValueOnce({ data: { fields: mockTableRows, data: mockValues } });
    axios.get.mockResolvedValueOnce({ data: { graphs: mockGraphs } });
  
    render(<Graphs />);
  
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets/123', {
        headers: {
          Authorization: 'Bearer fakeToken',
        },
      });
    });
    expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/datasets/123/graphs', {
      headers: {
        Authorization: 'Bearer fakeToken',
      },
    });
    expect(screen.getByText('Graphs')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Graph' })).toBeInTheDocument();
    expect(screen.queryByText('Loading graphs...')).not.toBeInTheDocument();

    // Verify the rendered graphs
    expect(screen.getByLabelText('X-Axis')).toBeInTheDocument();
    expect(screen.getByLabelText('Y-Axis')).toBeInTheDocument();
    expect(screen.getAllByRole('graphics')).toHaveLength(2);
  });
});  
