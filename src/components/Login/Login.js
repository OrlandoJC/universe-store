import './Login.css'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate, useSearchParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'

const Login = () => {
    const { signInWithGoogle, logOut, user, loading, register, signIn, errorMessage } = useContext(AuthContext)
    const [formMode, setFormMode] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [errorAuth, setErrorAuth] = useState();

    const [searchParams] = useSearchParams()
    let navigate = useNavigate()

    useEffect(() => {
        if (user) {
            if (searchParams.get("redirect") && !searchParams.get("id")) {
                const to = searchParams.get("redirect")
                navigate("/" + to, { replace: true });
            } else if (searchParams.get("redirect") && searchParams.get("id")) {
                const to = searchParams.get("redirect")
                const id = searchParams.get("id")

                navigate("/" + to + "/" + id, { replace: true });
            } else {
                navigate("/", { replace: true })
            }
        }

    }, [user, loading])

    useEffect(() => {
        if (errorMessage) {
            if (errorMessage === "Firebase: Error (auth/wrong-password).") {
                setErrorAuth("Contraseña o usuario incorrecto")
            }
        }
    }, [errorMessage])

    const changeForm = (type) => {
        setFormMode(type)
    }

    const onRegister = async (e) => {
        e.preventDefault()

        if (formMode === "sign-up-mode") {
            if (user !== "" && email !== "" && password !== "") {
                await register(name, email, password)
                setEmail("")
                setPassword("")
                setName("")
            }
        }
    }

    const onLogin = async (e) => {
        e.preventDefault();

        if (formMode === "") {
            await signIn(email, password)
            setEmail("")
            setPassword("")
            setName("")
        }
    }

    return (
        <>
            <div className={`container_form ${formMode}`} >
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Entrar</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <input type="submit" value="Login" className="btn solid" onClick={onLogin} />
                            {
                                errorAuth && < Alert severity="error">{errorAuth}</Alert>
                            }
                            <p className="social-text">O entra con tu cuenta de google</p>
                            <div className="social-media">

                                <a href="#" className="social-icon" onClick={signInWithGoogle}>
                                    <i className="fab fa-google"></i>
                                </a>

                            </div>
                        </form>
                        <form action="#" className="sign-up-form">
                            <h2 className="title">Registro</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <input type="submit" className="btn" value="Registrarme" onClick={onRegister} />
                            <p className="social-text">O registrarte con tu cuenta de google</p>
                            <div className="social-media">
                                <a href="#" className="social-icon" onClick={signInWithGoogle}>
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>¿Eres nuevo?</h3>
                            <p>
                                Registrate para empezar a comprar ahora.
                            </p>
                            <button className="btn transparent" id="sign-up-btn" onClick={() => { changeForm("sign-up-mode") }}>
                                Registrarse
                            </button>
                        </div>
                        <img src="images/log.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>¿Ya tienes una cuenta ?</h3>
                            <p>
                                Entra para seguir comprando
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={() => { changeForm("") }}>
                                Entrar
                            </button>
                        </div>
                        <img src="img/register.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login