import { doc, updateDoc, arrayUnion, collection, where, getDocs, query, addDoc, getDoc, FieldPath, documentId } from "firebase/firestore";
import { db } from './index'


export const getFavorites = async (userId, page) => {
    const collectionRef = doc(db, "users", userId)
    const favoriteItems = []
    try {
        const userData = await getDoc(collectionRef);
        const favorites = userData.data().favorites;
        const paginateFavorites = favorites.splice((page - 1) * 10 , page * 10)
        const products = query(collection(db, "products"), where(documentId(), "in", paginateFavorites))
        const dataDocs = await getDocs(products)

        dataDocs.forEach((doc) => {
                favoriteItems.push({ 
                    id: doc.id, data: doc.data() 
                })
        });

        return favoriteItems
    } catch (err) {
        console.log(err)
    }
}

export const updateFavorites = async (userId, favoriteId) => {
    const profileReference = doc(db, "users", userId);

    try {
        await updateDoc(profileReference, {
            favorites: arrayUnion(favoriteId)
        })
    } catch (err) {
        console.log(err)
    }
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
        const usersCollection = query(collection(db, "users"), where("uid", "==", uid));
        const ordersCollection = query(collection(db, "orders"), where("buyer.userId", "==", uid));

        const querySnapshotUsers = await getDocs(usersCollection);
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
    } catch (err) {
        console.log(err)
    }
}

export const getByCategory = (categoryId) => {
    const collectionRef = categoryId
        ? query(collection(db, "products"), where("category", "==", categoryId))
        : collection(db, "products")

    return getDocs(collectionRef)
}

export const getProductById = (productId) => {
    const collectionRef = doc(db, "products", productId)

    return getDoc(collectionRef);
}
