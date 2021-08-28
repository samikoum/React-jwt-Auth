import React, { useState, useEffect } from 'react'
import axios from 'axios'



function Dashboard() {
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API}/test`,
    //         { headers: { "Authorization": `${localStorage.getItem('token')}` } })
    //         .then((response) => {
    //             console.log(response.data)
    //             setTest(response.data)
    //         }).catch((error) => {
    //             if (error.response) {
    //                 // Request made and server responded
    //                 console.log(error.response)
    //                 if (error.response.status == 404) {
    //                     setError('404 Page Note Found')
    //                 } else {
    //                     setError(error.response.data)
    //                 }
    //             } else if (error.request) {
    //                 // The request was made but no response was received
    //                 console.log(error.request);
    //                 setError('Network Error try again !')
    //             } else {
    //                 // Something happened in setting up the request that triggered an Error
    //                 console.log('Error', error.message);
    //                 setError(error.message)
    //             }
    //         })
    // }, [])

    return (
        <div>
            <h1>Dashboard....</h1>
        </div>
    )
}

export default Dashboard
