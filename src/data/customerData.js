import { firebase } from "../Firebase/firebase";
import Customer from '../models/customer';
import customersUser from '../screens/Customer';
import email from '../screens/Customer';

const firestore = firebase.firestore();



export const getCustomersAdmin = async () => {
    try {
        const response = await firestore.collection('appointment');
        const data = await response.orderBy('status', 'desc').get();
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

export const getCustomer = async (id) => {
    try {
        const customer = await firestore.collection('appointment').doc(id);
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