import React, { useState, useEffect } from "react";
import { firebase } from "../Firebase/firebase";
import "../App.css";
import {
    Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton
} from '@material-ui/core';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Delete } from '@material-ui/icons';
import { deleteCustomerAppoint, getCustomersAppoint, getCustomerApp } from '../data/customerData';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Customer from "../models/customer";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box
  } from '@material-ui/core';
import { Close } from '@material-ui/icons';
const firestore = firebase.firestore();
const AppointDone = () => {
    const classes = useStyles();
    const [customersApp, setCustomersApp] = useState([]);
    const [customersUser, setCustomersUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [conOpen, setConOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [allReserve, setAllReserve] = useState('');
    const [custId, setCustId] = useState('');
    const [name, setName] = useState('');
    const [ssn, setSsn] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState('');
    const [bdate, setBirth] = useState('');
    const [alignment, setAlignment] = React.useState("true");
    const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }
    const handleClose = () => {
        setOpen(false);
        setConOpen(false);
    }
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleSsn = (event) => {
        setSsn(event.target.value);
    }
    const handlePhone = (event) => {
        setPhone(event.target.value);
    }
    const handlePlace = (event) => {
        setEmail(event.target.value);
    }
    const handleDate = (event) => {
        setPlace(event.target.value);
    }
    const handleTime = (event) => {
        setDate(event.target.value);
    }
    const handleEmail = (event) => {
        setTime(event.target.value);
    }
    const handleDetail = (event) => {
        setTime(event.target.value);
    }
    const handleStatus = (event) => {
        setStatus(event.target.value);
    }
    
    const getlist = async () => {
        try {
            setLoading(true);
            const listApp = await getCustomersAppoint();
            setCustomersApp(listApp);
            setAllReserve(listApp.length);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getlistUser = async () => {
        try {
            const listUser = await getCustomersUser();
            setCustomersUser(listUser);
            setConOpen(true)
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getCustomersUser = async () => {
        try {
            const response = await firestore.collection('users/' + email.toString() + '/custo');
            const data = await response.get();
            let array = [];
            data.forEach(doc => {
                const customer = new Customer(
                    doc.id,
                    doc.data().name,
                    doc.data().bdate,
                    doc.data().ssn,
                    doc.data().phone,
                    doc.data().email,
                    doc.data().place,
                    doc.data().date,
                    doc.data().time,
                    doc.data().detail,
                    doc.data().status
                );
                array.push(customer);
            });
            return array;
        } catch (error) {
            throw error
        }
    }
    const getOneCustomer = async (id) => {
        try {
            setFormMode(false);
            setCustId(id);
            const response = await getCustomerApp(id);
            setName(response.name);
            setSsn(response.ssn);
            setPhone(response.phone);
            setEmail(response.email);
            setPlace(response.place);
            setDate(response.date);
            setTime(response.time);
            setDetail(response.detail);
            setStatus(response.status);
            setBirth(response.bdate);
            setOpen(true);
        } catch (error) {
            toast.error(error.message);
        }
    }
    const deleteHandler = async (id) => {
        try {
            await deleteCustomerAppoint(id);
            setConOpen(false);
            getlist();
            toast.success('Customer Deleted Successfully');
        } catch (error) {
            toast.error(error.message);
        }
    }
    const deleteHandlerUser = async (id) => {
        try {
            await deleteCustomerUser(id);
            setConOpen(false);
            getlist();
        } catch (error) {
            toast.error(error.message);
        }
    }
    const deleteCustomerUser = async (id) => {
        try {
            await firestore.collection('users/' + email.toString() + '/custo').doc(id).delete();
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        getlist();
    }, []);

    const CustomerDialog = (props) => {
        return (
            <Dialog
            fullWidth={true}
            maxWidth='lg'
            open={props.open}
            aria-labelledby="max-width-dialog-title">
                <DialogTitle>????????????????????????????????????</DialogTitle>
                <ValidatorForm>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>???????????? : <span style={{color:'#3F838C'}}>{props.name}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>?????????????????????????????????????????? : <span style={{color:'#3F838C'}}>{props.ssn}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>???????????????????????? : <span style={{color:'#3F838C'}}>{props.phone}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>??????????????? : <span style={{color:'#3F838C'}}>{props.email}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>????????????????????? : <span style={{color:'#3F838C'}}>{props.place}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>??????????????????????????? : <span style={{color:'#3F838C'}}>{props.date}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>????????????????????? : <span style={{color:'#3F838C'}}>{props.time}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>?????????????????????????????????????????? : <span style={{color:'#3F838C'}}>{props.detail}</span></p>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="secondary" onClick={() =>  getlistUser()}>
                           Delete
                        </Button>
                        <Button icon={Close} onClick={props.close} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }

    const ConfirmDelete = (props) => {
        return (
            <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle>Delete</DialogTitle>
                <ValidatorForm
                    onSubmit={props.close}
                >
                    <DialogContent>
                        Confirm to delete
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="secondary" onClick={() =>  deleteHandler(custId) && (customersUser.map((custUser) => deleteHandlerUser(custUser.id)))}>
                           Delete
                        </Button>
                        <Button onClick={props.close} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
      };

    return (
            <Grid style={{width:'100%', display:'block', pading:'20px'}}>
            <TableContainer component={Paper} style={{width:'100%', display:'block', alignContent:'center'}}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h6" component="div">
                            ?????????????????????????????????????????????????????????????????????????????? {allReserve}
                        </Typography>
                    </Grid>
                </Grid>
                <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                >
                <ToggleButton value="true">????????????????????????</ToggleButton>
                <Link to="/appointment/afternoon"><ToggleButton value="false">????????????????????????</ToggleButton></Link>
                </ToggleButtonGroup>
                <Table className={classes.table} style={{width:'100%', alignContent:'center'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Name</TableCell>
                            <TableCell className={classes.head}>Phone</TableCell>
                            <TableCell className={classes.head}>Date</TableCell>
                            <TableCell className={classes.head}>Time</TableCell>
                            <TableCell className={classes.head}>Status</TableCell>
                            <TableCell className={classes.head}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customersApp.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <ScaleLoader
                                        css={override}
                                        size={150}
                                        color={"#eb4034"}
                                        loading={loading} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {customersApp.map((cust) => (
                                    <TableRow key={cust.id}>
                                        <TableCell>{cust.name}</TableCell>
                                        <TableCell>{cust.phone}</TableCell>
                                        <TableCell>{cust.date}</TableCell>
                                        <TableCell>{cust.time}</TableCell>
                                        <TableCell style={{color:'#00008B'}}>{cust.status}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => getOneCustomer(cust.id)} color="secondary" aria-label="delete customer">
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
                <CustomerDialog
                open={open}
                close={handleClose}
                formmode={formMode}
                name={name}
                ssn={ssn}
                phone={phone}
                email={email}
                place={place}
                date={date}
                time={time}
                detail={detail}
                status={status}
                bdate={bdate}
                changeName={handleName}
                changeSsn={handleSsn}
                changePhone={handlePhone}
                changeEmail={handleEmail}
                changePlace={handlePlace}
                changeDate={handleDate}
                changeTime={handleTime}
                changeDetail={handleDetail}
                changeStatus={handleStatus}
            />
            <ConfirmDelete
                open={conOpen}
                close={handleClose}
                formmode={formMode}
                listUser={getlistUser}
            />
            </TableContainer>
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
export default AppointDone;