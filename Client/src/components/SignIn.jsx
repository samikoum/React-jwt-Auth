import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Loader from './Loader';


function SignIn({ isAuth }) {

    // useState
    const [loader, setLoader] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState('')
    const [msgError, setMsgError] = useState('')
    const inputContainers = useRef([])
    const history = useHistory()

    // Yup
    let schema = yup.object().shape({
        username: yup.string().required().trim(),
        email: yup.string().email().required().trim(),
        password: yup.string().min(3).max(15).required(),
        confirmpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required("Confirm Password is a required field")
    })

    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    // useEffect
    var errorsLength = Object.keys(errors).length
    useEffect(() => {
        if (errors) {
            // username errors
            typeof errors.username !== 'undefined' ?
                inputContainers.current[0].classList.add('input-test')
                : inputContainers.current[0].classList.remove('input-test')
            // email errors
            typeof errors.email !== 'undefined' ?
                inputContainers.current[1].classList.add('input-test')
                : inputContainers.current[1].classList.remove('input-test')
            // password errors
            typeof errors.password !== 'undefined' ?
                inputContainers.current[2].classList.add('input-test')
                : inputContainers.current[2].classList.remove('input-test')
            // confirmPassword errors
            typeof errors.confirmpassword !== 'undefined' ?
                inputContainers.current[3].classList.add('input-test')
                : inputContainers.current[3].classList.remove('input-test')
        }
    }, [errorsLength])

    // Form Submit 
    const submitForm = (data) => {
        setMsgSuccess('')
        setMsgError('')
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/register`, data).then((response) => {
            console.log(response.data)
            if (response.data === 'OK') {
                setMsgSuccess('Welcome !')
                setLoader(false)
                reset()
                // setTimeout(() => {
                //     history.push("/login")
                // }, 5000);

            } else {
                setMsgError(response.data)
            }
            setLoader(false)
        }).catch((error) => {
            console.log(error)
            setMsgError('Network error')
            setLoader(false)
        })

    }

    if (isAuth) {
        return <Redirect to={{ pathname: "/dashboard" }} />
    }

    return (
        <>
            <div className="sign-in">
                <div className="sign-in-container">
                    <h1 className="text-primary" >Create New Account</h1>
                    <div className="sign-in-model">
                        {msgSuccess ? <p className="p-msg p-success">{msgSuccess}</p> : null}
                        {msgError ? <p className="p-msg p-error">{msgError}</p> : null}
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="input-div">
                                <label >Username</label>
                                <div className="input-container" ref={inputContainer => inputContainers.current.push(inputContainer)} >
                                    <i className="fa fa-user icon"></i>
                                    <input
                                        className="input-field"
                                        type="text"
                                        placeholder="Username"
                                        {...register("username")}
                                    />
                                </div>
                                <p>{errors.username?.message}</p>
                            </div>
                            <div className="input-div">
                                <label >Email</label>
                                <div className="input-container" ref={inputContainer => inputContainers.current.push(inputContainer)}>
                                    <i className="fa fa-envelope icon"></i>
                                    <input
                                        className="input-field"
                                        type="text"
                                        placeholder="Email"
                                        {...register("email")}
                                    />
                                </div>
                                <p>{errors.email?.message}</p>
                            </div>

                            <div className="input-div">
                                <label >Password</label>
                                <div className="input-container" ref={inputContainer => inputContainers.current.push(inputContainer)}>
                                    <i className="fa fa-key icon"></i>
                                    <input
                                        className="input-field"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                </div>
                                <p>{errors.password?.message}</p>
                            </div>

                            <div className="input-div">
                                <label >Confirm Password</label>
                                <div className="input-container" ref={inputContainer => inputContainers.current.push(inputContainer)}>
                                    <i className="fa fa-key icon"></i>
                                    <input
                                        className="input-field"
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...register("confirmpassword")}
                                    />
                                </div>
                                <p>{errors.confirmpassword?.message}</p>
                            </div>
                            <div className="btn-container">
                                {loader ?
                                    <Loader />
                                    : <button
                                        type="submit"
                                        className="btn color-primary"
                                        style={{ width: '100%' }}>
                                        Create
                                    </button>}
                                <p>Already have account? <Link to="/login"><span>Sign In</span> </Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
