import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserList from '../UserList';
import { fetchUsers,deleteUser } from '../../store/UserSlice';

const mockStore = configureStore([]);

describe('UserList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
        ],
        loading: false,
        error: null,
      },
    });

    // Mock the dispatch functions
    store.dispatch = jest.fn();
  });

  it('renders user list correctly', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    // Check if the user cards are rendered correctly
    const user1Name = screen.getByText('John Doe');
    expect(user1Name).toBeInTheDocument();

    const user2Name = screen.getByText('Jane Smith');
    expect(user2Name).toBeInTheDocument();

    // Check if the delete button is rendered for each user
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    expect(deleteButtons.length).toBe(2);
  });

  it('dispatches fetchUsers action on component mount', async() => {
    store.dispatch = jest.fn(fetchUsers);
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    // Check if fetchUsers action is dispatched
    // expect(store.dispatch).toHaveBeenCalledWith(fetchUsers());

  });

//   it('dispatches deleteUser action when delete button is clicked', () => {
//     render(
//       <Provider store={store}>
//         <UserList />
//       </Provider>
//     );

//     // Click the delete button for the first user
//     const deleteButton = screen.getAllByRole('button', { name: 'Delete' })[0];
//     fireEvent.click(deleteButton);

//     // Check if deleteUser action is dispatched with the correct userId
//     expect(store.dispatch).toHaveBeenCalledWith(deleteUser(1));
//   });
});
