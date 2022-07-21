import { createContext, useEffect, useState } from "react"
import { auth, db } from "../../services/firebase"
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, where, query, setDoc, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [errorMessage, setErrorMessage] = useState()
    const [profileUpdate, setProfileUpdate] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user)=> {
            if(!user) {
                navigate("/")
            }
        })
    }, [])

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            const docs = await getDocs(q)

            if (docs.docs.length === 0) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                    address: "",
                    postal: "",
                    phone: ""
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

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                authProvider: "local",
                email,
                phone: "",
                address: "",
                postal: "",
                photoURL : "https://liumater.sirv.com/Deafult-Profile-Pitcher.png"
            })

            await updateProfile(auth.currentUser, {
                displayName: user.displayName ? user.displayName : name,
                photoURL: user.photoURL ? user.photoURL : "https://liumater.sirv.com/Deafult-Profile-Pitcher.png"
            })

        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    const updateImageProfile = async (url) => {
        await updateProfile(auth.currentUser, {
            photoURL: url
        })

        await updateDoc( doc(db, "users", auth.currentUser.uid), {
            photoUrl : url
        })
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
        <AuthContext.Provider value={{
            signInWithGoogle,
            user,
            loading,
            errorMessage,
            logOut,
            register,
            signIn, error, updateImageProfile, profileUpdate, setProfileUpdate
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider