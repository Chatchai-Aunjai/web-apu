import{ init } from 'emailjs-com';
import emailjs from 'emailjs-com';
// npm install emailjs-com
// invoke in onClick
init("user_5ZCFqcLFXuPKqlVx03Cus");
export const sendFailedEmail = (e, name, email) => {
    e.preventDefault();
    var failedParams = {
      to_name: name.toString(),
      from_name: 'หน่วยบริการปฐมภูมิ123 มหาวิทยาลัยขอนแก่น',
      email: email.toString(),
      message: 'วันเวลาที่ท่านเลือกมีการจองคิวเต็มแล้ว โปรดเลือกวันเวลาในการจองใหม่อีกครั้ง ขออภัยในความไม่สะดวก',
      };
    emailjs.send('service_zn0xihe', 'template_y6otxwp', failedParams, 'user_5ZCFqcLFXuPKqlVx03Cus')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
}