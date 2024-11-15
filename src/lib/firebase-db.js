

import {
    doc,
    setDoc,
    getDocs,
    collection,
    query,
    where,
} from "firebase/firestore";
import { DB } from "@/utils/firebase-config";


// [Vendor]
const createVendor = async (vendor) => {
    try {
        const vendorsCollection = collection(DB, "vendors");
        const vendorDocRef = doc(vendorsCollection, vendor.name);
        await setDoc(vendorDocRef, vendor, { merge: true }); // Merge to avoid overwriting
            
    } catch (error) {
        console.log(`[Firebase-db][createVendor] Error: ${error}`);
    }
}

const getVendorByName = async (name) => {
    try {
        const vendorRef = DB.collection("vendors").doc(name);
        
        const doc = await vendorRef.get();
        if (doc.exists) {
            return doc.data();
        } else {
            console.log(`[Firebase-db][getVendorByName] No such document!`);
            return null;
        }
    } catch (error) {
        console.log(`[Firebase-db][getVendorByName] Error: ${error}`);
    }
}

const updateOrders = async ({vendorName, orders}) => {
    try {
        const vendorsCollection = collection(DB, "vendors");
        const vendorDocRef = doc(vendorsCollection, vendorName);
        const ordersCollection = collection(vendorDocRef, "orders");

        orders.forEach(async (order) => {
            const orderIdFirebase = order.orderId.split("/")[order.orderId.split("/").length - 1];
            const orderDocRef = doc(ordersCollection, orderIdFirebase);
            await setDoc(orderDocRef, order, { merge: true });
        });
    } catch (error) {
        console.log(`[Firebase-db][updateOrders] Error: ${error}`);
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
        console.log(`[Firebase-db][getOrders] Error: ${error}`);
    }
}

const updateProduct = async ({vendorName, productId, product}) => {
    try {
        const vendorsCollection = collection(DB, "vendors");
        const vendorDocRef = doc(vendorsCollection, vendorName);
        const productsCollection = collection(vendorDocRef, "products");

        const productIdFirebase = productId.split("/")[productId.split("/").length - 1];
        const productDocRef = doc(productsCollection, productIdFirebase);
        await setDoc(productDocRef, {
            productId,
            ...product
        }, { merge: true });
    } catch (error) {
        console.log(`[Firebase-db][updateProduct] Error: ${error}`);
    }
}

const getProducts = async ({vendorName}) => {
    try {
        const vendorsCollection = collection(DB, "vendors");
        const vendorDocRef = doc(vendorsCollection, vendorName);
        const productsCollection = collection(vendorDocRef, "products");

        const querySnapshot = await getDocs(productsCollection);
        const products = [];

        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });

        return products;
    } catch (error) {
        console.log(`[Firebase-db][getProducts] Error: ${error}`);
    }
}


// [Payout]
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
        console.log(`[Firebase-db][updatePayout] Error: ${error}`);
    }
}

export {
    createVendor,
    getVendorByName,
    updateOrders,
    getOrders,
    updateProduct,
    updatePayout};