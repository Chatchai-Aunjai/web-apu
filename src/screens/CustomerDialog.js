import React from 'react';
import CardContent from '@mui/material/CardContent';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import getEmail from './Customer';


const CustomerDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Add New' : 'Update'}  Customer</DialogTitle>
            <ValidatorForm
                onSubmit={props.addCustomer}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
 
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Name"
                            onChange={props.changeName}
                            name="firstname"
                            value={props.name}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator

                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="SSN"
                            onChange={props.changeSsn}
                            name="lastname"
                            value={props.ssn}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
   
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Phone Number"
                                onChange={props.changePhone}
                                name="phonenumber"
                                value={props.phone}
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
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
  
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Place"
                                onChange={props.changePlace}
                                name="place"
                                value={props.place}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextValidator
      
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Date"
                                onChange={props.changeDate}
                                name="date"
                                value={props.date}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextValidator
      
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Time"
                                onChange={props.changeTime}
                                name="time"
                                value={props.time}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator 

                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Detail"
                                onChange={props.changeDetail}
                                name="detail"
                                value={props.detail}
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="secondary" onClick={() => getEmail}>
                       {props.formmode ? 'Add' : 'Submit'}
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default CustomerDialog;