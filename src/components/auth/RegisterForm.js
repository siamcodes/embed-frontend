import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { alertSliceActions } from "../../store/AlertStore"
import { userRegisterView } from "../../store/UserStore"
import { AlertComponent } from "../AlertComponent"

export const RegisterForm = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const history = useHistory()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (username !== '' && email !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                const userObj = { username, email, password }
                const result = await dispatch(userRegisterView(userObj))
                if (result) {
                    history.push('/login')
                }
            } else {
                dispatch(alertSliceActions.showAlert({ message: 'Passwords must Match', variant: 'alert-danger' }))
            }
        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All Fields must be populated', variant: 'alert-danger' }))
        }
    }

    return (
        <div className="card-me" style={{ width: "30rem" }}>
            <h3 className='mb-3'>Register Form</h3>
            <AlertComponent />
            <form onSubmit={onSubmitHandler}>
                <input className='form-control mb-3' type='text' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='form-control mb-3' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='form-control mb-3' type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className='form-control mb-3' type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className="d-grid">
                    <button className="btn btn-primary" type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}