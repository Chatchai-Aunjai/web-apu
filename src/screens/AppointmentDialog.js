import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const AppointmentDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Add New' : 'Update'}  Appointment</DialogTitle>
            <ValidatorForm
                onSubmit={props.addAppointment}
            >
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="First Name"
                            onChange={props.changeFirstname}
                            name="firstname"
                            value={props.firstname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Last Name"
                            onChange={props.changeLastname}
                            name="lastname"
                            value={props.lastname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Student ID"
                            onChange={props.changStudentID}
                            name="studentID"
                            value={props.studentID}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="SSN"
                            onChange={props.changeSSN}
                            name="ssn"
                            value={props.ssn}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Phone Number"
                            onChange={props.changephonenumber}
                            name="phonenumber"
                            value={props.phonenumber}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Email"
                            onChange={props.changeEmail}
                            name="email"
                            value={props.email}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Time"
                            onChange={props.changeTime}
                            name="time"
                            value={props.time}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Medical Certificate</FormLabel>
                            <RadioGroup aria-label="medicalcertificate" name="medicalcertificate" value={props.medicalcertificate} onChange={props.changeCertificate}>
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="secondary">
                       {props.formmode ? 'Add' : 'Update'}
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default AppointmentDialog;