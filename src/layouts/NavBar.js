import React from "react";
import "../App.css";
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
import { Bolt } from "@mui/icons-material";

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
                    <Typography variant="h5" className={classes.title} style={{fontWeight:'bold'}}>
                        KKUL Admin
                    </Typography>
                    {auth && (
                        <div>
                            <Button
                                id="fade-button"
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleMenu}
                                style={{color:'white'}}
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
                                <MenuItem onClick={handleClose}><Link to="/history">ประวัติการจอง</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/edit_default">แก้ไขการจอง</Link></MenuItem>
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
        background: "#0ca9dd",
        
    },
    title: {
        flexGrow: 1,
    }
}));

export default NavBar;