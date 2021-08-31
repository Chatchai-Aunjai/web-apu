import React from 'react';
import { Layout, Row, Col, Button } from 'antd';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const { Content } = Layout;

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

function AppBookedContent() {

    const classes = useStyles();

    return (
            <Row>
                <Col flex={3}><Content class="info">
                    <h1>ข้อมูลส่วนตัว</h1><br/><br/>
                    <p>ชื่อ-นามสกุล : นาย ประหยัด  จันทร์อังคาร</p><br/>
                    <p>วัน/เดือน/ปี เกิด : 10/10/1999</p><br/>
                    <p>เลขบัตรประชาชน : 123-4567-890-12-3</p><br/>
                    <p>เบอร์โทรศัพท์ : 093-1234567</p><br/>
                    <p>อีเมลติดต่อ : tsundereboiii@kkumail.com</p><br/><br/>
                    <Button class="editbutton" type="primary" style={{ background: "#606060", border: "#606060"}}>แก้ไข</Button>
                </Content></Col>

                <Col flex={2}><Content class="booked">
                    <h1>จองคิว</h1><br/><br/>
                    <p>สถานบริการปฐมภูมิ : <select name="location" id="location" defaultValue>
                        <option value="" selected="selected">โปรดเลือกสถานบริการ</option>
                        <option value="" selected="selected">สถานบริการหน่วยปฐมภูมิ 1</option>
                        <option value="" selected="selected">สถานบริการหน่วยปฐมภูมิ 2</option>
                        <option value="" selected="selected">สถานบริการหน่วยปฐมภูมิ 3</option>
                        </select></p><br/>
                    <p>เวลาทำการ : 9.00-12.00 น. และ 12.30-17.00 น.</p><br/><br/><br/>

                    <div class="date"><p style={{ padding:"15px 30px 0px 0px" }}>วัน-เวลาที่เกิดอาการ :</p>
                    <form className={classes.container} noValidate>
                    <TextField
                        style={{ padding:"0px 20px 0px 0px" }}
                        id="date"
                        label="Date"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{shrink: true,}}
                    />
                    </form>
                    <form className={classes.container} noValidate>
                    <TextField
                        id="time"
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    </form></div><br/><br/>   
                    <div class="queue"><p>คิวรวม : </p><p style={{color: "red",padding:"0 10px"}}>20</p><p class="queuenow">คิวปัจจุบัน : </p><p style={{color: "green",padding:"0 10px"}}>10</p></div>
                    <br/>


                    <div class="jongbutton">
                    <Button type="primary" style={{ background: "#FF0000", border: "#606060"}}>ยกเลิก</Button>
                    <Button type="primary" style={{ background: "#70C1AA", border: "#606060"}}>ถัดไป</Button>
                    </div>
                </Content></Col>
            </Row>
        
    );
}

export default AppBookedContent;