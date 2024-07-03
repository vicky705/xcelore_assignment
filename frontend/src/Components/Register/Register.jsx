import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  createUserByAdmin } from '../../Service/API';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
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

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const res = await createUserByAdmin({ firstName, lastName, email, password })
      if(res.success) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/login')
      }else {
        setErrors({password : res.msg})
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center', 
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          Register
        </Typography>
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
    </Box>
  );
};

export default RegistrationForm;
