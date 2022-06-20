import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import { db } from './index'

export const updateFavorites = async (userId, favoriteId) => {
    const profileReference = doc(db, "users", userId);

    await updateDoc(profileReference, {
        favorites: arrayUnion(favoriteId)
    })

}
