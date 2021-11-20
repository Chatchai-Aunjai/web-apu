import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button,} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export const ConfirmDialog = (props) => {
    return (
        <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>Submit Done!</DialogTitle>
            <ValidatorForm>
                <DialogContent>
                    Send email confirm to user already!
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default ConfirmDialog;