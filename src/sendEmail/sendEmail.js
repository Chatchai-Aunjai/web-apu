import{ init } from 'emailjs-com';
import emailjs from 'emailjs-com';
init("user_5ZCFqcLFXuPKqlVx03Cus");
// npm install emailjs-com
// invoke in onClick ex.: onClick={sendconfEmail}
export const sendconfEmail = (e, name, email) => {
    e.preventDefault();
    var confParams = {
        to_name: name.toString(),
        from_name: 'หน่วยบริการปฐมภูมิ123 มหาวิทยาลัยขอนแก่น',
        email: email.toString()
      };
    emailjs.send('service_zn0xihe', 'template_88jjem7', confParams, 'user_5ZCFqcLFXuPKqlVx03Cus')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
}