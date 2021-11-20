import React , {useState, useEffect}from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import { AddCircle, Edit, Delete } from '@material-ui/icons';
import { addAppointment, getAppointments,  getAppointment, updateAppointment, deleteAppointment} from '../data/appointmentData';
import AppointmentDialog from './AppointmentDialog';
const Appointment = () => {
    const classes = useStyles();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [ssn, setSSN] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [time, setTime] = useState('');
    const [medicalcertificate, setMedicalcertificate] = useState('Yes');
    
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleStudentID = (event) => {
        setStudentID(event.target.value);
    }
    const handleSSN = (event) => {
        setSSN(event.target.value);
    }
    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleTime = (event) => {
        setTime(event.target.value);
    }
    const handleCertificate = (event) => {
        setMedicalcertificate(event.target.value);
    }
    
    const getlist = async () => {
        try {
            setLoading(true);
            const list = await getAppointments();
            setAppointments(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneAppointment = async (id) => {
        try {
            setFormMode(false);
            setCustId(id);
            const response = await getAppointment(id);
            setFirstName(response.firstname);
            setLastName(response.lastname);
            setStudentID(response.studentID);
            setSSN(response.ssn);
            setPhoneNumber(response.phonenumber);
            setEmail(response.email);
            setTime(response.time);
            setMedicalcertificate(response.medicalcertificate)
            setOpen(true);
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    const deleteHandler = async (id) => {
        try {
            await deleteAppointment(id);
            getlist();
            toast.success('Customer Deleted Successfully');
        } catch (error) {
            toast.error(error.message);
        }
    }
    const handleAdd = () => {
        setOpen(true);
        setFormMode(true);
        setFirstName('');
        setLastName('');
        setStudentID('');
        setSSN('');
        setPhoneNumber('');
        setEmail('');
        setTime('');
        setMedicalcertificate('Yes');
    }
    const addAppointmentHandler = async () => {
        try {
            const appointment = {
                firstname,
                lastname,
                studentID,
                ssn,
                phonenumber,
                email,
                time,
                medicalcertificate
            }
            if (formMode) {
                await addAppointment(appointment);
                toast.success('Customer Added Successfully');
                getlist();
                setOpen(false);
                setFirstName('');
                setLastName('');
                setStudentID('');
                setSSN('');
                setPhoneNumber('');
                setEmail('');
                setTime('');
                setMedicalcertificate('Yes');
            } else {
                await updateAppointment(custId, appointment);
                toast.success('Customer Updated Successfully');
                getlist();
                setOpen(false);
                setFirstName('');
                setLastName('');
                setStudentID('');
                setSSN('');
                setPhoneNumber('');
                setEmail('');
                setTime('');
                setMedicalcertificate('Yes');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getlist();
    }, []);
    return (
        <Container className={classes.container}>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                        All Appointments
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Add</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Full Name</TableCell>
                            <TableCell className={classes.head}>Student ID</TableCell>
                            <TableCell className={classes.head}>SSN</TableCell>
                            <TableCell className={classes.head}>Phone Number</TableCell>
                            <TableCell className={classes.head}>Email</TableCell>
                            <TableCell className={classes.head}>Time</TableCell>
                            <TableCell className={classes.head}>Medical Certificate</TableCell>
                            <TableCell className={classes.head}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8}>
                                    <ScaleLoader
                                    css={override}
                                    size={150}
                                    color={"#eb4034"}
                                    loading={loading} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {appointments.map((cust) => (
                                <TableRow key={cust.id}>
                                    <TableCell>{cust.firstname} {cust.lastname}</TableCell>
                                    <TableCell>{cust.studentID}</TableCell>
                                    <TableCell>{cust.ssn}</TableCell>
                                    <TableCell>{cust.phonenumber}</TableCell>
                                    <TableCell>{cust.email}</TableCell>
                                    <TableCell>{cust.time}</TableCell>
                                    <TableCell>{cust.medicalcertificate}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => getOneAppointment(cust.id)} color="primary" aria-label="update customer">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete customer">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}    
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <AppointmentDialog
                open={open}
                close={handleClose}
                formmode={formMode}
                firstname={firstname}
                lastname={lastname}
                studentID={studentID}
                ssn={ssn}
                phonenumber={phonenumber}
                email={email}
                time={time}
                medicalcertificate={medicalcertificate}
                changeFirstname={handleFirstName}
                changeLastname={handleLastName}
                changStudentID={handleStudentID}
                changeSSN={handleSSN}
                changephonenumber={handlePhoneNumber}
                changeEmail={handleEmail}
                changeTime={handleTime}
                changeCertificate={handleCertificate}
                addAppointment={addAppointmentHandler}
            />
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        ['@media (min-width:320px)']: { 
            fontSize: 10,
        }
    },
    container: {
        marginTop: '40px',
        
    },
    title: {
        flex: '1 1 100%',
        padding: '20px',
        
        ['@media (min-width:320px)']: { 
            fontSize: 20,
        }
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

export default Appointment;
