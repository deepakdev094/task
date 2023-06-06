import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Card, CardContent, Typography, Button } from '@material-ui/core';
import { fetchUsers, selectUsers, selectLoading, selectError, deleteUser } from '../store/UserSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const {users, loading, error}= useSelector(state=>state.user)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <div>
      {users.map((user,index) => (
        <Card key={user.id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Button
              variant="contained"
              color="secondary"
              data-test-id={`delete-button-${index}`}
              onClick={() => handleDeleteUser(user.id)}
              style={{ marginTop: '10px' }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
