import React, { useState, useEffect } from "react";
import { firebase } from "../Firebase/firebase";
import "../App.css";
import {
    Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton
} from '@material-ui/core';
import { ScaleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { AddCircle, Edit, Delete } from '@material-ui/icons';
import { getCustomersAdmin, getAdminMorning, getAdminAfter, getCustomer, deleteCustomerAdmin, addCustomerAppoint } from '../data/customerData';
import {ConfirmDialog} from './ConfirmDialog';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Customer from "../models/customer";
import {sendconfEmail} from '../sendEmail/sendEmail'
import {sendFailedEmail} from '../sendEmail/sendFailedEmail'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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



const History = () => {
    const classes = useStyles();
    const [customers, setCustomers] = useState([]);
    const [customersMorn, setCustomersMorn] = useState([]);
    const [customersAfter, setCustomersAfter] = useState([]);
    const [customersUser, setCustomersUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [conOpen, setConOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [doneOpen, setDoneOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [allReserveMorn, setAllReserveMorn] = useState('');
    const [allReserveAfter, setAllReserveAfter] = useState('');
    const [custId, setCustId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState('');
    const [bdate, setBirth] = useState('');
    const [alignment, setAlignment] = React.useState("true");

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }
    const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
        setConOpen(false);
        setSubOpen(false)
    }
    const handleDoneClose = () => setDoneOpen(false)

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handlePhone = (event) => {
        setPhone(event.target.value);
    }
    const handlePlace = (event) => {
        setEmail(event.target.value);
    }
    const handleTime = (event) => {
        setDate(event.target.value);
    }
    const handleEmail = (event) => {
        setTime(event.target.value);
    }
    const handleStatus = (event) => {
        setStatus(event.target.value);
    }
    const refreshPage = () => {
        window.location.reload(false);
    }
    const getlist = async () => {
        try {
            setLoading(true);
            const list = await getCustomersAdmin();
            setCustomers(list);
            const listMorn = await getCustomersUser();
            setCustomersMorn(listMorn);
            const listAfter = await getAdminAfter();
            setCustomersAfter(listAfter);
            setAllReserveMorn(listMorn.length);
            const allList = listMorn.length - 2; 
            setAllReserveAfter(allList);
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
    const getSubmitUser = async () => {
        try {
            const listUser = await getCustomersUser();
            setCustomersUser(listUser);
            setSubOpen(true);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getCustomersUser = async () => {
        try {
            const response = await firestore.collection('history').orderBy('date', 'desc');
            const data = await response.get();
            let array = [];
            data.forEach( async (doc) => {
                const customer = new Customer(
                    doc.id,
                    doc.data().name,
                    doc.data().phone,
                    doc.data().email,
                    doc.data().date,
                    doc.data().time,
                    doc.data().status
                );
                array.push(doc.id);
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
            const response = await getCustomer(id);
            setName(response.name);
            setPhone(response.phone);
            setEmail(response.email);
            setDate(response.date);
            setTime(response.time);
            setStatus(response.status);
            setOpen(true);
        } catch (error) {
            toast.error(error.message);
        }
    }
    const deleteHandler = async (e, id) => {
        try {
            await deleteCustomerAdmin(id);
            sendFailedEmail(e, name, email)
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
    const addCustomerHandler = async (e) => {
        try {
            let status = "ตรวจสอบแล้ว";
            const customer = {
                name,
                phone,
                email,
                date,
                time,
                status
            }
            customersUser.map((custUser) => 
            updateCustomerUser(custUser.id, customer));
            await addCustomerAppoint(customer);
            setOpen(false);
            setSubOpen(false);
            setDoneOpen(true);
            sendconfEmail(e, name, email);
            deleteCustomerAdmin(custId);
            getlist();
            setName('');
            setPhone('');
            setEmail('');
            setDate('');
            setTime('');
            setStatus('');
        } catch (error) {
            toast.error(error.message);
        }
    }
    const updateCustomerUser = async (id, data) => {
        try {
            const res = await getCustomer(custId);
            setEmail(res.email);
            const customer = await firestore.collection('users/' + email.toString() + '/custo').doc(id);
            await customer.update(data);
        } catch (error) {
            throw error;
        }
    }
    const deleteCustomerUser = async (id) => {
        try {
            await firestore.collection('users/' + email.toString() + '/custo').doc(id).delete();
        } catch (error) {
            throw error;
        }
    }
    const confirmClick = (cust) => {
        sessionStorage.setItem("histoDate", cust);
        console.log(sessionStorage.histoDate.toString())
      };
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
                <DialogTitle>ข้อมูลผู้จอง (กรุณาทำการยืนยันคิว)</DialogTitle>
                <ValidatorForm>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>ชื่อ : <span style={{color:'#3F838C'}}>{props.name}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>เบอร์โทร : <span style={{color:'#3F838C'}}>{props.phone}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>อีเมล : <span style={{color:'#3F838C'}}>{props.email}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>วันที่จอง : <span style={{color:'#3F838C'}}>{props.date}</span></p>
                            </Grid>
                            <Grid item xs={10} sm={10} md={6}>
                                <p style={{fontSize:20}}>เวลาจอง : <span style={{color:'#3F838C'}}>{props.time}</span></p>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="" style={{fontWeight:'bold'}} onClick={() =>  getSubmitUser()}>
                           Submit
                        </Button>
                        <Button color="secondary" onClick={() =>  getlistUser()}>
                           Cancel
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
                        <Button type="submit" color="secondary" onClick={(e) => deleteHandler(e, custId) && (customersUser.map((custUser) => deleteHandlerUser(custUser.id)))}>
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
      const ConfirmSubmit = (props) => {
        return (
            <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle>Submit</DialogTitle>
                <ValidatorForm
                >
                    <DialogContent>
                        Confirm to submit
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="secondary" onClick={(e) => addCustomerHandler(e)}>
                            Submit
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
                            ประวัติการจองทั้งหมด {allReserveMorn} วัน
                        </Typography>
                    </Grid>
                </Grid>
                <Table className={classes.table} style={{width:'100%', alignSelf:'center'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head} style={{fontSize:'20px', fontWeight:'bolder'}}>เลือกวัน</TableCell>
                            <TableCell className={classes.head}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customersMorn.length === 0 ? (
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
                                {customersMorn.map((cust) => (
                                          <nav aria-label="secondary mailbox folders">
                                          <Link to="/history/date"><List onClick={()=>{confirmClick(cust)}}>
                                            <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={cust} />
                                              </ListItemButton>
                                            </ListItem>
                                          </List></Link>
                                        </nav>
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
                phone={phone}
                email={email}
                date={date}
                time={time}
                status={status}
                changeName={handleName}
                changePhone={handlePhone}
                changeEmail={handleEmail}
                changePlace={handlePlace}
                changeTime={handleTime}
                changeStatus={handleStatus}
                addCustomer={addCustomerHandler}
            />
            <ConfirmDelete
                open={conOpen}
                close={handleClose}
                formmode={formMode}
                onSub={ConfirmSubmit}
            />
            <ConfirmSubmit
                open={subOpen}
                close={handleClose}
                formmode={formMode}
                addCustomer={addCustomerHandler}
            />
             <ConfirmDialog
                open={doneOpen}
                close={handleDoneClose}
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
export default History;