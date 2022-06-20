import { createContext, useState } from "react"
import { app, db } from "../../services/firebase"
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, where, query, getFirestore } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app)

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [errorMessage, setErrorMessage] = useState()

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            const docs = await getDocs(q)

            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    const register = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    const logOut = () => {
        signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ signInWithGoogle, user, loading, errorMessage, logOut, register, signIn, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider