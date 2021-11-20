import React from "react";
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { firebase } from "../Firebase/firebase";
import {
    Link
} from "react-router-dom";

const NavBar = (props) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const signOut = () => {
        firebase.auth().signOut();
        handleClose();
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.menubackgroud}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        APU
                    </Typography>
                    {auth && (
                        <div>
                            <Button
                                id="fade-button"
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleMenu}
                                style={{color:'black'}}
                            >
                                <MenuSharpIcon/>
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}><Link to="/admin">รอการตรวจสอบ</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/appointment">ตรวจสอบแล้ว</Link></MenuItem>
                                <MenuItem onClick={() => signOut()}><Link to="/">ออกจากระบบ</Link></MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    menubackgroud: {
        background: 'linear-gradient(45deg, #3F838C 30%, #99DFB2 90%)',
        
    },
    title: {
        flexGrow: 1,
    }
}));

export default NavBar;