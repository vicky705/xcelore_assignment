import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createUser } from '../../Service/API';
import { toast } from 'react-toastify';

const RegistrationForm = ({ handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};

    if (!firstName.trim()) {
      validationErrors.firstName = 'First Name is required';
    }
    if (!lastName.trim()) {
      validationErrors.lastName = 'Last Name is required';
    }
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const res = await createUser({ firstName, lastName, email, password });
      console.log(res.data)
      if (res.success) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setErrors({});
        handleClose();
        toast.success('User created successfully');
      } else {
        setErrors({ password: res.msg });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, bgcolor: '#FFFDFA', }} className='edit-popup'>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setErrors((prevErrors) => ({
              ...prevErrors,
              firstName: '',
            }));
          }}
          error={!!errors.firstName}
          helperText={errors.firstName || ''}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setErrors((prevErrors) => ({
              ...prevErrors,
              lastName: '',
            }));
          }}
          error={!!errors.lastName}
          helperText={errors.lastName || ''}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: '',
            }));
          }}
          error={!!errors.email}
          helperText={errors.email || ''}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: '',
            }));
          }}
          error={!!errors.password}
          helperText={errors.password || ''}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForm;
