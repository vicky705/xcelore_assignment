import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoginAndAdmin } from '../../redux/userSlice';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const location = useLocation();
  const [pages, setPages] = useState(['Home', 'Login']);
  const { isLogin, isAdmin } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isActive = (page) => {
    if (page === 'User Management') {
      return location.pathname === '/usermanagement';
    }
    return location.pathname === `/${page.toLowerCase()}`;
  };

  useEffect(() => {
    let temp = isLogin
      ? ['Home', 'Logout']
      : ['Register', 'Login'];
    if (isAdmin && isLogin) {
      temp.pop();
      temp.push('User Management');
      temp.push('Logout');
    }
    setPages(temp);
  }, [isLogin, isAdmin]);

  const logout = () => {
    const payload = {
      isAdmin : false,
      isLogin : false
    }
    localStorage.removeItem('token');
    dispatch(setIsLoginAndAdmin(payload))
    navigate('/login')
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VICKY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {page === 'Logout' ? (
                      <Button onClick={logout} style={{ textDecoration: 'none', color: isActive(page) ? 'blue' : 'inherit' }}>
                        {page}
                      </Button>
                    ) : (
                      <Link to={page === 'User Management' ? '/usermanagement' : `/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: isActive(page) ? 'blue' : 'inherit' }}>
                        {page}
                      </Link>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vicky
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={page === 'Logout' ? logout : handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: isActive(page) ? 'blue' : 'white',
                  display: 'block',
                }}
                component={page === 'Logout' ? 'button' : Link}
                to={page === 'User Management' ? '/usermanagement' : `/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
