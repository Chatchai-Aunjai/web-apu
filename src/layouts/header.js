import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { firebase } from "../Firebase/firebase";
import "react-notifications-component/dist/theme.css";
import '../assets/css/confirm.css'
import {
    Link
} from "react-router-dom";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const signOut = () => {
        firebase.auth().signOut();
    }
    return (
        <Box>
        <AppBar position="static" open={open}>
            <Toolbar>
            <Typography variant="h4" noWrap component="div" style={{fontWeight:'bold', flexGrow: 1}}><Link to="/admin" style={{color:'white'}}>
                KKUL Admin    </Link>
            </Typography>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
            },
            }}
            variant="temporary"
            anchor="right"
            open={open}
            onEscapeKeyDown={handleDrawerClose}
            onBackdropClick={handleDrawerClose}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <Link to="/admin" onClick={() => handleDrawerClose()}><ListItem style={{backgroundColor:'#E8E8E8'}}>{'รอการตรวจสอบ'}</ListItem></Link>
                <Link to="/history" onClick={() => handleDrawerClose()}><ListItem>{'ประวัติการจอง'}</ListItem></Link>
                <Link to="/edit_default" onClick={() => handleDrawerClose()}><ListItem style={{backgroundColor:'#E8E8E8'}}>{'แก้ไขการจอง'}</ListItem></Link>
                <Link to="/" onClick={() => signOut()}><ListItem>{'ออกจากระบบ'}</ListItem></Link>
            </List>
        </Drawer>
        </Box>
    );
}

export default PersistentDrawerLeft;