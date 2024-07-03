import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserList from '../UserList/UserList';
import { getUsers, createUserByAdmin, updateUserByAdmin, deleteUser } from '../../Service/API';
import AddUserModal from '../AddUserModal/AddUserModal';
import EditUserModal from '../EditUserModal/EditUserModal';

const UserManagement = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = async (userData) => {
    setAddModalOpen(false);
    if (userData) {
      const res = await createUserByAdmin(userData);
      if (res.success) {
        await fetchUsers();
      } else {
        console.error('Failed to add user:', res.msg);
      }
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = async (userData) => {
    setEditModalOpen(false);
    if (userData) {
      const res = await updateUserByAdmin(userData);
      if (res.success) {
        await fetchUsers();
      } else {
        console.error('Failed to update user:', res.msg);
      }
    }
  };

  const handleDelete = async (userId) => {
    const res = await deleteUser(userId);
    if (res.success) {
      await fetchUsers(); 
    } else {
      console.error('Failed to delete user:', res.msg);
    }
  };

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res || []); 
  };

  useEffect(() => {
    fetchUsers(); 
  }, [users]); 

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">User Details</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
        >
          Add User
        </Button>
      </Box>
      <UserList users={users} onEdit={handleOpenEditModal} onDelete={handleDelete} />
      
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <AddUserModal handleClose={handleCloseAddModal} />
      </Modal>

      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-user-modal-title"
        aria-describedby="edit-user-modal-description"
      >
        <EditUserModal handleClose={handleCloseEditModal} initialValues={selectedUser} />
      </Modal>
    </Box>
  );
};

export default UserManagement;
