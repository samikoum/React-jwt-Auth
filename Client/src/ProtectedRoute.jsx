import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {

    const { setIsAuth } = { ...rest }

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API}/verifyToken`,
    //         { headers: { "Authorization": `${localStorage.getItem('token')}` } })
    //         .then((res) => {
    //             if (res.data === 'OK') {
    //                 console.log(res.data)
    //             }
    //         }).catch((error) => {
    //             setIsAuth(localStorage.removeItem('isAuth'))
    //         })
    // }, [])


    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (isAuth && isAuth !== null) {
                        return <Component setIsAuth={setIsAuth} />
                    } else {
                        return <Redirect to={{ pathname: "/login" }} />
                    }
                }}
            >
            </Route>
        </>
    )
}

export default ProtectedRoute
