class Appointment {
    constructor(id, firstname, lastname, phonenumber, studentID, ssn, email, time, medicalcertificate){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.studentID = studentID;
        this.ssn = ssn;
        this.email = email;
        this.time = time;
        this.medicalcertificate = medicalcertificate;
    }
}

export default Appointment;