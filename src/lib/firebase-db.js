

import {
    doc,
    setDoc,
    getDocs,
    collection,
    query,
    where,
} from "firebase/firestore";
import { DB } from "@/utils/firebase-config";
import { get } from "lodash";


const createVendor = async (vendor) => {
    try {
        const vendorsCollection = collection(DB, "vendors");
        const vendorDocRef = doc(vendorsCollection, vendor.name);
        await setDoc(vendorDocRef, vendor, { merge: true }); // Merge to avoid overwriting
            
    } catch (error) {
        console.log(error);
    }
}

const getVendorByName = async (name) => {
    try {
        const vendorRef = DB.collection("vendors").doc(name);
        
        const doc = await vendorRef.get();
        if (doc.exists) {
            return doc.data();
        } else {
            console.log("No such vendor!");
        }
    } catch (error) {
        console.log(error);
    }
}

const updateOrders = async ({vendorName, orders}) => {
    try {
        const vendorsCollection = collection(DB, "vendors");
        const vendorDocRef = doc(vendorsCollection, vendorName);
        const ordersCollection = collection(vendorDocRef, "orders");

        orders.forEach(async (order) => {
            const orderDocRef = doc(ordersCollection);
            await setDoc(orderDocRef, order);
        });
    } catch (error) {
        console.log(error);
    }
}

const getOrders = async ({vendorName}) => {

    try {
        const vendorsCollection = collection(DB, "vendors");
        const vendorDocRef = doc(vendorsCollection, vendorName);
        const ordersCollection = collection(vendorDocRef, "orders");

        const querySnapshot = await getDocs(ordersCollection);
        const orders = [];

        querySnapshot.forEach((doc) => {
            orders.push(doc.data());
        });

        return orders;
    } catch (error) {
        console.log(error);
    }
}

const updatePayout = async ({amount, timestamp, user, premium}) => {
    try {
        const payoutCollection = collection(DB, "payout-requests");
        const payoutRef = doc(payoutCollection);
  
        await setDoc(payoutRef, {
            accountID: user?.accountId,
            amount: (amount * (1 - (premium.commission ?? 0.3))).toFixed(2),
            timestamp: timestamp,
            commission: premium.commission ?? 0.3,
            grossAmount: amount,
        });
    } catch (error) {
        console.log(error);
    }
}

export {createVendor, getVendorByName, updateOrders, getOrders, updatePayout};