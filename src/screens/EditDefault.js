import React, { useState, useEffect } from "react";
import { firebase } from "../Firebase/firebase";
import axios from 'axios';
import "../App.css";
import {
  Paper,
  makeStyles,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from '@material-ui/core/Button';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "react-notifications-component/dist/theme.css";
import '../assets/css/confirm.css'
import { store } from "react-notifications-component";;
const EditDefault = () => {
  const classes = useStyles();
  // variables
  const defaultMaxCap = 240;
  const defaultMorningStartTime = "09:00";
  const defaultMorningEndTime = "12:00";
  const defaultEveningStartTime = "13:30";
  const defaultEveningEndTime = "16:30";
  const baseURL = "https://kkulib-testapi.herokuapp.com/settings";
  // useState
  const [toggleCalendar, setToggleCalendar] = useState(true);
  const [weekends, enableWeekends] = useState(false);
  const [userMaxCap, setUserCap] = useState(defaultMaxCap);
  const [morningStartTime, setMorningStartTime] = useState(
    defaultMorningStartTime
  );
  const [morningEndTime, setMorningEndTime] = useState(defaultMorningEndTime);
  const [eveningStartTime, setEveningStartTime] = useState(
    defaultEveningStartTime
  );
  const [eveningEndTime, setEveningEndTime] = useState(defaultEveningEndTime);
  const [confirmSettings, setConfirmSettings] = useState(false);
  // functions
  const setMornStart = (evt) => {
    setMorningStartTime(evt.target.value);
  };
  const setMornEnd = (evt) => {
    setMorningEndTime(evt.target.value);
  };
  const setEveningStart = (evt) => {
    setEveningStartTime(evt.target.value);
  };
  const setEveningEnd = (evt) => {
    setEveningEndTime(evt.target.value);
  };
  const toggleCalendarOn = () => {
    setToggleCalendar("true");
  };
  const toggleCalendarOff = () => {
    setToggleCalendar("false");
  };
  const toggleWeekendsOn = () => {
    enableWeekends("true");
  };
  const toggleWeekendsOff = () => {
    enableWeekends("false");
  };
  const setMaxCap = (evt) => {
    setUserCap(evt.target.value ? evt.target.value : 240);
  };
  const ConfirmClick = () => {
    setConfirmSettings(true)
  };
  
  // useEffect
  useEffect(() => {
    if(confirmSettings === true){
      console.log("user capacity : " + userMaxCap);
      console.log("toggle calendar : " + toggleCalendar);
      console.log("weekend state is " + weekends);
      console.log("Morning start : " + morningStartTime);
      console.log("Morning end : " + morningEndTime);
      console.log("Evening start : " + eveningStartTime);
      console.log("Evening end : " + eveningEndTime);
      const sendSettings = async () =>{
        const options = {
          method: 'patch',
          url: baseURL,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        var settings = {
          "maxUser": userMaxCap,
          "selectable" : toggleCalendar,
          "weekends": weekends,
          "businessHours": [
            {
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              startTime: morningStartTime,
              endTime: morningEndTime,
            },
            {
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              startTime: eveningStartTime,
              endTime: eveningEndTime,
            },
          ],
        }
        await axios.patch(baseURL, settings, options)
        .then((response) => {
          if(response.status === 200){
            store.addNotification({
              title: "??????????????????!",
              message: "???????????????????????????????????????????????????",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
            });
            
          } else {
            store.addNotification({
              title: "?????????????????????!",
              message: "??????????????????????????????????????????????????????????????????",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
            });
          }
        },(error) => {
          store.addNotification({
            title: "?????????????????????!",
            message: `?????????????????????????????????????????????????????????????????? ??????????????????????????? ${error}` ,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
        ) 
      }
      sendSettings();
      setConfirmSettings(false);
    } 
  }, [
    eveningEndTime,
    eveningStartTime,
    morningEndTime,
    morningStartTime,
    toggleCalendar,
    userMaxCap,
    weekends,
    confirmSettings
  ]);
  return (
    <Grid style={{ width: "100%", padding: "20px" }}>
      <Typography className={classes.title} variant="h5" component="div">
        ??????????????????????????????????????????????????????
      </Typography>
      <Container
        component={Paper}
        style={{ width: "100%", display: "block", alignContent: "center" }}
      >
        <Grid container style={{ width: "100%", pading: "20px" }}>
          <Grid item xs={8}>
            <p
              style={{ fontSize: 20, marginTop: "20px", marginBottom: "10px" }}
            >
              ???????????????????????????{" "}
            </p>
          </Grid>
          <Grid item xs={7} sm={7} md={5}>
            <p style={{ fontSize: 20 }}>
              ???????????????????????? :{" "}
              <TextField
                id="time"
                type="time"
                label="???????????????"
                defaultValue="09:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
                style={{ marginRight: "10px", marginBottom:'20px' }}
                onChange={setMornStart}
              />
              <TextField
                id="time"
                type="time"
                label="?????????????????????"
                defaultValue="12:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
                onChange={setMornEnd}
              />
            </p>
          </Grid>
          <Grid item xs={7} sm={7} md={5}>
            <p style={{ fontSize: 20 }}>
              ???????????????????????? :{" "}
              <TextField
                id="time"
                type="time"
                label="???????????????"
                defaultValue="13:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
                style={{ marginRight: "10px", marginBottom:'20px'}}
                onChange={setEveningStart}
              />
              <TextField
                id="time"
                type="time"
                label="?????????????????????"
                defaultValue="16:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
                onChange={setEveningEnd}
              />
            </p>
          </Grid>
          <Grid item xs={10} sm={10} md={6} style={{ marginTop: "40px" }}>
            <p style={{ fontSize: 20 }}>
              ????????????????????????????????????????????????????????????????????? :{" "}
              <TextField
                required
                onChange={setMaxCap}
                defaultValue="240"
                type="number"
              />
            </p>
            <p style={{ fontSize: 20, marginTop: "30px" }}>
              ??????????????????????????????????????????-????????????????????? :{" "}
              <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              defaultValue="open"
              style={{ marginLeft: "30px" }}
            >
              <FormControlLabel
                value="open"
                control={<Radio />}
                onClick={toggleWeekendsOn}
                label="????????????"
              />
              <FormControlLabel
                value="close"
                control={<Radio color="secondary" />}
                onClick={toggleWeekendsOff}
                label="?????????"
              />
            </RadioGroup>
            </p>
            <p style={{ fontSize: 20, marginTop: "30px" }}>?????????????????????????????? : </p>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              defaultValue="open"
              style={{ marginLeft: "30px" }}
            >
              <FormControlLabel
                value="open"
                control={<Radio />}
                onClick={toggleCalendarOn}
                label="????????????"
              />
              <FormControlLabel
                value="close"
                control={<Radio color="secondary" />}
                onClick={toggleCalendarOff}
                label="?????????"
              />
            </RadioGroup>
            <br />
            <br />
            <div style={{ padding: "10px" , paddingBottom:'20px'}}>
              <Button
                variant="contained"
                style={{backgroundColor:'#0ca9dd', color:'white'}}
                onClick={() => {
                  confirmAlert({
                    childrenElement: () => <div></div>, // Custom UI or Component
                    buttons: [
                      {
                        label: "??????????????????",
                      },
                      {
                        label: "??????????????????",
                        onClick: () => ConfirmClick(),
                      },
                    ],
                    closeOnEscape: true,
                    closeOnClickOutside: true,
                    customUI: ({ onClose }) => {
                      return (
                        <div
                          className="custom-ui"
                          style={{ backgroundColor: "white", width:'200px', textAlign:'center' }}
                        >
                          <h1>??????????????????</h1>
                          <p style={{ height:'50px', paddingTop:'10px'}}>??????????????????????????????????????????????????????????????????</p>
                          <div
                            className="alert-btn-container"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              paddingTop: "5px",
                              float: "right",
                            }}
                          >
                            <Button
                              
                              onClick={() => {
                                ConfirmClick();
                                onClose();
                              }}
                              style={{ cursor: "pointer",marginRight:'10px', backgroundColor:'#0ca9dd', color:'white' }}
                            >
                              ??????????????????
                            </Button>
                            <div>
                              <Button
                                style={{ cursor: "pointer", backgroundColor:'#DCDCDC' }}
                                onClick={onClose}
                              >
                                ??????????????????
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  });
                }}
              >
                ??????????????????
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    ["@media (min-width:320px)"]: {
      width: "100%",
    },
  },
  container: {
    marginTop: "40px",
  },
  title: {
    flex: "1 1 100%",
    padding: "20px",
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
  },
}));

export default EditDefault;
