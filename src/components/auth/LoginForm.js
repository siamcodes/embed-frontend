import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { alertSliceActions } from "../../store/AlertStore"
import { userLoginView } from "../../store/UserStore"
import { AlertComponent } from "../AlertComponent"
import { Link } from 'react-router-dom'

export const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const history = useHistory()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (email !== '' && password !== '') {

            const userObj = { email, password }
            const result = await dispatch(userLoginView(userObj))
            if (result) {
                history.push('/profile')
            }

        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All Fields must be populated', variant: 'alert-danger' }))
        }
    }

    return (
        <div className="card-me" style={{ width: "30rem" }}>
            <h3 className='mb-3'>Login Form</h3>
            <AlertComponent />

            <form onSubmit={onSubmitHandler}>
                <input className='form-control mb-3' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='form-control mb-3' type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="d-grid">
                    <button className="btn btn-primary mb-3" type='submit'>Login</button>
                </div>
            </form>
            <Link to='/passwordResetRequest'>Forgot Password</Link>
        </div>
    )
}