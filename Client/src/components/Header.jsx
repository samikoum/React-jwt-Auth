import React from 'react'
import { Link, useHistory } from 'react-router-dom'


function Header({ setIsAuth }) {

    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('isAuth')
        setIsAuth(localStorage.removeItem('isAuth'))
        history.push('/login')
    }

    if (localStorage.getItem('isAuth')) {
        return (
            <>
                <header id="Header">
                    <div className="header-container">
                        <div className="logo">
                            <h1 style={{ cursor: "pointer" }}><span>edu</span>cal</h1>
                        </div>
                        <div className="header-container-right">
                            <nav>
                                <ul>
                                    <li>
                                        <Link
                                            to="/"
                                            className="a">
                                            Home
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <button className="btn color-primary" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </header>

            </>
        )
    }

    return (
        <>
            <header id="Header">
                <div className="header-container">
                    <div className="logo">
                        <h1 style={{ cursor: "pointer" }}><span>edu</span>cal</h1>
                    </div>
                    <div className="header-container-right">
                        <nav>
                            <ul>
                                <li>
                                    <Link
                                        to="/"
                                        className="a">
                                        Home
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <Link to="/login"><button className="btn color-primary">Sign In</button></Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
