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
import { getCustomersAdmin, getCustomer, updateCustomerAdmin, deleteCustomerAdmin } from '../data/customerData';
import {ConfirmDialog} from './ConfirmDialog';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Customer from "../models/customer";
import {sendconfEmail} from '../sendEmail/sendEmail'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box
  } from '@material-ui/core';
import { Close } from '@material-ui/icons';
const firestore = firebase.firestore();
const Customers = () => {
    const classes = useStyles();
    const [customers, setCustomers] = useState([]);
    const [customersUser, setCustomersUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [conOpen, setConOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [doneOpen, setDoneOpen] = useState(false);
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
            const list = await getCustomersAdmin();
            setCustomers(list);
            setAllReserve(list.length);
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
            const response = await getCustomer(id);
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
            await deleteCustomerAdmin(id);
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
                bdate,
                ssn,
                phone,
                email,
                place,
                date,
                time,
                detail,
                status
            }
            customersUser.map((custUser) => 
            updateCustomerUser(custUser.id, customer))
            await updateCustomerAdmin(custId, customer);
            toast.success('Customer Updated Successfully');
            setOpen(false);
            setSubOpen(false);
            getlist();
            sendconfEmail(e, name, email);
            setDoneOpen(true);
            setName('');
            setBirth('');
            setSsn('');
            setPhone('');
            setEmail('');
            setPlace('');
            setDate('');
            setTime('');
            setDetail('');
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
                <DialogTitle>Update Customer</DialogTitle>
                <ValidatorForm>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <p style={{fontSize:20}}>ชื่อ : <span style={{color:'#3F838C'}}>{props.name}</span></p>
                            </Grid>
                            <Grid item xs={6}>
                                <p style={{fontSize:20}}>เลขบัตรประชาชน : <span style={{color:'#3F838C'}}>{props.ssn}</span></p>
                            </Grid>
                            <Grid item xs={6}>
                                <p style={{fontSize:20}}>เบอร์โทร : <span style={{color:'#3F838C'}}>{props.phone}</span></p>
                            </Grid>
                            <Grid item xs={6}>
                                <p style={{fontSize:20}}>อีเมล : <span style={{color:'#3F838C'}}>{props.email}</span></p>
                            </Grid>
                            <Grid item xs={6}>
                                <p style={{fontSize:20}}>สถานที่ : <span style={{color:'#3F838C'}}>{props.place}</span></p>
                            </Grid>
                            <Grid item xs={3}>
                                <p style={{fontSize:20}}>วันที่จอง : <span style={{color:'#3F838C'}}>{props.date}</span></p>
                            </Grid>
                            <Grid item xs={3}>
                                <p style={{fontSize:20}}>เวลาจอง : <span style={{color:'#3F838C'}}>{props.time}</span></p>
                            </Grid>
                            <Grid item xs={12}>
                                <p style={{fontSize:20}}>อาการเบื้องต้น : <span style={{color:'#3F838C'}}>{props.detail}</span></p>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="red" onClick={() =>  getSubmitUser()}>
                           Submit
                        </Button>
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
                        <Button type="submit" color="secondary" onClick={() => customersUser.map((custUser) => (deleteHandler(custId)) && (deleteHandlerUser(custUser.id)))}>
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
                            คิวทั้งหมด {allReserve}
                        </Typography>
                    </Grid>
                </Grid>
                <Table className={classes.table} style={{width:'100%', alignContent:'center'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Name</TableCell>
                            <TableCell className={classes.head}>SSN</TableCell>
                            <TableCell className={classes.head}>Phone</TableCell>
                            <TableCell className={classes.head}>Place</TableCell>
                            <TableCell className={classes.head}>Date</TableCell>
                            <TableCell className={classes.head}>Time</TableCell>
                            <TableCell className={classes.head}>Detail</TableCell>
                            <TableCell className={classes.head}>Status</TableCell>
                            <TableCell className={classes.head}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length === 0 ? (
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
                                {customers.map((cust) => (
                                    <TableRow key={cust.id}>
                                        <TableCell>{cust.name}</TableCell>
                                        <TableCell>{cust.ssn}</TableCell>
                                        <TableCell>{cust.phone}</TableCell>
                                        <TableCell>{cust.place}</TableCell>
                                        <TableCell>{cust.date}</TableCell>
                                        <TableCell>{cust.time}</TableCell>
                                        <TableCell>{cust.detail}</TableCell>
                                        <TableCell>{cust.status}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => getOneCustomer(cust.id)} color="primary" aria-label="update customer">
                                                <Edit />
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
                addCustomer={addCustomerHandler}
            />
            <ConfirmDelete
                open={conOpen}
                close={handleClose}
                formmode={formMode}
                onSub={ConfirmSubmit}
                listUser={getlistUser}
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
export default Customers;