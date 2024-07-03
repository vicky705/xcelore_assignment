import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { login } from '../../Service/API';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoginAndAdmin } from '../../redux/userSlice';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateForm = () => {
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    return validationErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const userData = await login({ email, password });
        if(userData.success) {
          localStorage.setItem('token', userData.token);
          setEmail('');
          setPassword('');
          setErrors({});
          const payload = {
            isAdmin : userData.isAdmin,
            isLogin : true
          }
          dispatch(setIsLoginAndAdmin(payload))
          navigate('/home')
        }else {
          console.log({userData})
          setErrors({password : userData.msg})
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({password : error.message})
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
        alignItems: 'center',
        height: '100vh', // Center vertically within viewport
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
                email: '', // Clear email error when input changes
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
                password: '', // Clear password error when input changes
              }));
            }}
            error={!!errors.password}
            helperText={errors.password || ''}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
