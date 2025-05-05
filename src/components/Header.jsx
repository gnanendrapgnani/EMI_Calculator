import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "EXCHANGE RATES (LIVE)", path: "/exchange" },
    { label: "ABOUT", path: "/about" },
    { label: "ERROR PAGE", path: "/error" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem
            key={link.path}
            component={Link}
            to={link.path}
            selected={location.pathname === link.path}
          >
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6">Loan Calculator</Typography>
          </Box>

          <Box display="flex" alignItems="center" flexWrap="wrap">
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {navLinks.map((link) => (
                  <Box
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      whiteSpace: "nowrap",
                      backgroundColor:
                        location.pathname === link.path
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  color="default"
                />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Header;
