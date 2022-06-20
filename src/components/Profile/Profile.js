import { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"

const Profile = () => {
    const { user } = useContext(AuthContext)
    let navigate = useNavigate()

    if(!user) {
        return navigate("/", { replace: true })
    }

    return (
        <div>Profile</div>
    )
}

export default Profile