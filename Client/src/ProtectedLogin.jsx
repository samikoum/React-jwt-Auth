import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedLogin({ isAuth: isAuth, component: Component, ...rest }) {
    const { setIsAuth } = { ...rest }
    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (!isAuth && isAuth == null) {
                        return <Component setIsAuth={setIsAuth} />
                    } else {
                        return <Redirect to={{ pathname: "/dashboard" }} />
                    }
                }}
            >
            </Route>
        </>
    )
}

export default ProtectedLogin
