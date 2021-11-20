import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, makeStyles, Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
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
        localStorage.removeItem('user');
        props.setUserState();
        setAnchorEl(null);
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const signOut = () => {
        firebase.auth().signOut();
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
                            <Button color="inherit" onClick={() => signOut()}><Link to="/apu-admin">
                                ออกจากระบบ
                            </Link></Button> 
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