import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import me from '../assets/images/me-small.jpg';
// import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const domains = [
  {
    label: 'My React Playgrounds',
    path: 'https://fangwenlee.netlify.app/',
    desc: 'A curated showcase of my front-end development journey—featuring my professional resume, portfolio, and a growing collection of React-based mini projects. Explore clean UI components, responsive layouts, and hands-on experiments that reflect my passion for building elegant, maintainable web applications.',
  },
  {
    label: 'Shopping Cart',
    path: 'https://my-shoppingcart-540cd1.netlify.app/',
    desc: 'A lightweight shopping cart built with vanilla JavaScript, showcasing dynamic item management and real-time total calculation. Users can add or remove items, and the cart instantly updates the summary without relying on frameworks—demonstrating clean DOM manipulation and functional UI logic',
  },

  {
    label: 'My React Projects',
    path: '/projects',
    desc: 'A collection of React projects demonstrating various concepts and functionalities, including state management, routing, API integration, and component design. Each project is a hands-on example of building interactive and dynamic web applications using React.',
  },
];

const settings = [
  { label: 'Account', path: '/account' },
  { label: 'GitHub Profile', path: '/profile' },
  { label: 'Logout', path: '/logout' },
];

const styled = {
  mobileMenuBox: {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' },
  },
  menuMobile: {
    display: { xs: 'block', md: 'none' },
  },
  sumMenuBox: {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' },
  },
  menuBtn: {
    // my is for vertical margin
    my: 2,
    color: 'white',
    display: 'block',
    marginRight: '20px',
  },
  menu: {
    mt: '47px',
  },
  menuItem: {
    textAlign: 'center',
  },
  tooltip: {
    whiteSpace: 'pre-line',
    maxWidth: 350,
    lineHeight: 1.4,
    fontSize: 15,
    margin: '10px',
    backgroundColor: '#6d6c6cff',
    color: '#fff',
    padding: '15px 19px',
    borderRadius: 2,
    opacity: 0.7,
  },
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          {/*  --------  this part is work for Mobile  -------     */}
          <Box sx={styled.mobileMenuBox}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* Hamburger Icon */}
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
              sx={styled.menuMobile}
            >
              {domains.map(domain => (
                <MenuItem
                  key={domain.label}
                  onClick={() => {
                    window.open(`${domain.path}`, '_target'); // open in new tab
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={styled.menuItem}>{domain.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/*  --------  this part is work for Desktop  -------     */}

          <Box sx={styled.sumMenuBox}>
            {domains.map(domain => (
              <Tooltip
                arrow
                title={`${domain.desc}`}
                key={domain.label}
                componentsProps={{
                  tooltip: {
                    sx: styled.tooltip,
                  },
                }}
              >
                <Button
                  key={domain.label}
                  onClick={() => {
                    if (domain.path.startsWith('/')) {
                      navigate(domain.path);
                    } else {
                      window.open(`${domain.path}`, '_target'); // open in new tab
                    }
                    handleCloseNavMenu();
                  }}
                  sx={styled.menuBtn}
                >
                  {domain.label}
                </Button>
              </Tooltip>
            ))}
          </Box>

          {/*  avatar on the right side  with dropdown menu */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Fang-Wen Lee" src={me} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={styled.menu}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ label, path }) => (
                <MenuItem
                  key={label}
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate(path);
                  }}
                >
                  <Typography sx={styled.menuItem}>{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
