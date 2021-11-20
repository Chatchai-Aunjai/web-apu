import { firebase } from "../Firebase/firebase";
import Customer from '../models/customer';
import email from '../screens/Customer';

const firestore = firebase.firestore();

export const getCustomersAdmin = async () => {
    try {
        const response = await firestore.collection('appointment').orderBy('time');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const customer = new Customer(
                doc.id,
                doc.data().name,
                doc.data().bdate,
                doc.data().ssn,
                doc.data().phone,
                doc.data().email,
                doc.data().place,
                doc.data().date,
                doc.data().time,
                doc.data().detail,
                doc.data().status
            );
            array.push(customer);
        });
        return array;
    } catch (error) {
        throw error
    }
}
export const getCustomersAppoint = async () => {
    try {
        const response = await firestore.collection('complete-appointment').orderBy('time');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const customer = new Customer(
                doc.id,
                doc.data().name,
                doc.data().bdate,
                doc.data().ssn,
                doc.data().phone,
                doc.data().email,
                doc.data().place,
                doc.data().date,
                doc.data().time,
                doc.data().detail,
                doc.data().status
            );
            array.push(customer);
        });
        return array;
    } catch (error) {
        throw error
    }
}
export const getCustomersUser = async () => {
    try {
        const response = await firestore.collection('users/' + 'chatchai_aunjai@kkumail.com' + '/custo');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const customer = new Customer(
                doc.id,
                doc.data().name,
                doc.data().bdate,
                doc.data().ssn,
                doc.data().phone,
                doc.data().email,
                doc.data().place,
                doc.data().date,
                doc.data().time,
                doc.data().detail,
                doc.data().status
            );
            array.push(customer);
        });
        return array;
    } catch (error) {
        throw error
    }
}
export const addCustomer = async (customer) => {
    try {
        await firestore.collection('appointment').doc().set(customer);
    } catch (error) {
        throw error;
    }
}

export const addCustomerAppoint = async (appointment) => {
    try {
        await firestore.collection('complete-appointment').doc().set(appointment);
    } catch (error) {
        throw error;
    }
}

export const getCustomer = async (id) => {
    try {
        const customer = await firestore.collection('appointment').doc(id);
        const data = await customer.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}
export const getCustomerApp = async (id) => {
    try {
        const customer = await firestore.collection('complete-appointment').doc(id);
        const data = await customer.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateCustomerAdmin = async (id, data) => {
    try {
        const customer = await firestore.collection('appointment').doc(id);
        await customer.update(data);
    } catch (error) {
        throw error;
    }
}
export const updateCustomerUser = async (id, data) => {
    try {
        const customer = await firestore.collection('users/' + email.toString() + '/custo').doc(id);
        await customer.update(data);
    } catch (error) {
        throw error;
    }
}
export const deleteCustomerAdmin = async (id) => {
    try {
        await firestore.collection('appointment').doc(id).delete();
    } catch (error) {
        throw error;
    }
}
export const deleteCustomerUser = async (id) => {
    try {
        await firestore.collection('users/' + email.toString() + '/custo').doc(id).delete();
    } catch (error) {
        throw error;
    }
}
export const deleteCustomerAppoint= async (id) => {
    try {
        await firestore.collection('complete-appointment').doc(id).delete();
    } catch (error) {
        throw error;
    }
}