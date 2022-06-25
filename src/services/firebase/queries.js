import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    where,
    getDocs,
    query,
    addDoc
} from "firebase/firestore";
import { db } from './index'

export const updateFavorites = async (userId, favoriteId) => {
    const profileReference = doc(db, "users", userId);

    await updateDoc(profileReference, {
        favorites: arrayUnion(favoriteId)
    })
}

export const updateDataProfile = async (uid, address, postal, phone) => {
    const profileReference = doc(db, "users", uid);

    try {
        await updateDoc(profileReference, {
            address: address,
            postal: postal,
            phone: phone
        })
    } catch (err) {
        console.log(err)
    }
}

export const getProfile = async (uid) => {
    try {
        const usersCollection  = query(collection(db, "users"), where("uid", "==", uid));
        const ordersCollection = query(collection(db, "orders"), where("buyer.userId", "==", uid));

        const querySnapshotUsers  = await getDocs(usersCollection);
        const querySnapshotOrders = await getDocs(ordersCollection);

        const data = []
        const orders = []

        querySnapshotUsers.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() })
        });

        querySnapshotOrders.forEach((doc) => {
            orders.push({ id: doc.id, data: doc.data() })
        });

        const [result] = data;
        return [result.data, orders]
    } catch (err) {
        console.log(err)
    }
}



export const saveOrder = async (orderDetails) => {
    try {
        const collectionRef = collection(db, 'orders')
        const result = await addDoc(collectionRef, orderDetails)
        return result.id;
    } catch(err) {
        console.log(err)
    }
}