import firebase from '../helpers/db';
import Appointment from '../models/appointment';
import Login from '../authentication/Login'
const firestore = firebase.firestore();

export const getAppointments = async () => {
    try {
        
        const response = await firestore.collection('appointments')
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const appointment = new Appointment(
                doc.id,
                doc.data().firstname,
                doc.data().lastname,
                doc.data().phonenumber,
                doc.data().studentID,
                doc.data().ssn,
                doc.data().email,
                doc.data().time,
                doc.data().medicalcertificate
            );
            array.push(appointment);
        });
        return array;
    } catch (error) {
        throw error
    }
}
export const addAppointment = async (appointment) => {
    try {
        await firestore.collection('appointments').doc().set(appointment);
    } catch (error) {
        throw error;
    }
}
export const getAppointment = async (id) => {
    try {
        const appointment = await firestore.collection('appointments').doc(id);
        const data = await appointment.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}
export const updateAppointment = async (id, data) => {
    try {
        const appointment = await firestore.collection('appointments').doc(id);
        await appointment.update(data)
    } catch (error) {
        throw error;
    }
}
export const deleteAppointment = async (id) => {
    try {
        await firestore.collection('appointments').doc(id).delete();
    } catch (error) {
        throw error;
    }
}