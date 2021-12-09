import React, { useState, useEffect } from "react";
import { firebase } from "../Firebase/firebase";
import "../App.css";
import {
    Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton
} from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box
  } from '@material-ui/core';
import { Close } from '@material-ui/icons';
const firestore = firebase.firestore();
const EditDefault = () => {
    const classes = useStyles();

    return (
            <Grid style={{width:'100%', pading:'20px'}}>
                <Typography className={classes.title} variant="h5" component="div">
                            แก้ไขระเบียบการจอง
                </Typography>
            <Container component={Paper} style={{width:'100%', display:'block', alignContent:'center'}}>
                <Grid container style={{width:'100%', pading:'20px'}}>
                    <Grid item xs={8}>
                        <p style={{fontSize:20, marginTop:'20px', marginBottom:'10px'}}>เวลาทำการ </p>
                    </Grid>
                    <Grid item xs={7} sm={7} md={5}>
                                <p style={{fontSize:20}}>ช่วงเช้า : <TextField
                                    id="time"
                                    type="time"
                                    label="เริ่ม"
                                    defaultValue="09:00"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                    style={{marginRight:'10px'}}
                                />
                                <TextField
                                    id="time"
                                    type="time"
                                    label="สิ้นสุด"
                                    defaultValue="12:00"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                /></p>
                    </Grid>
                    <Grid item xs={7} sm={7} md={5}>
                                <p style={{fontSize:20}}>ช่วงบ่าย : <TextField
                                    id="time"
                                    type="time"
                                    label="เริ่ม"
                                    defaultValue="13:30"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                    style={{marginRight:'10px'}}
                                />
                                <TextField
                                    id="time"
                                    type="time"
                                    label="สิ้นสุด"
                                    defaultValue="16:30"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                /></p>
                    </Grid>
                    <Grid item xs={10} sm={10} md={6} style={{marginTop:'40px'}}>
                                <p style={{fontSize:20}}>จำนวนผู้ใช้งานที่รองรับ : <TextField value='240'/></p>
                                <p style={{fontSize:20, marginTop:'30px'}}>ปิดทำการเสาร์-อาทิตย์ : <Checkbox/></p>     
                                <p style={{fontSize:20, marginTop:'30px'}}>ปิดระบบการจอง : </p>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group" defaultValue="open">
                                    <FormControlLabel value="open" control={<Radio />} label="เปิด" />
                                    <FormControlLabel value="close" control={<Radio color='secondary'/>} label="ปิด" />
                                </RadioGroup><br/><br/>
                    </Grid>      
                </Grid>
            </Container>
            </Grid>

    );
}
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        ['@media (min-width:320px)']: { 
            width: '100%'
        },
    },
    container: {
        marginTop: '40px',
    },
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));
export default EditDefault;