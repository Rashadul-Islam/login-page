import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../Assets/logo.png";
import "./Header.css";

const Header = () => {
    return (
        <div className="bottom_border">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <img className="logo" src={logo} alt="" />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
                                <li className="nav-item dropdown effect">
                                    <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        CLASSES
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/">CLASS A</Link></li>
                                        <li><Link className="dropdown-item" to="/">CLASS B</Link></li>
                                        <li><Link className="dropdown-item" to="/">CLASS C</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown effect">
                                    <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        SUBJECTS
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/">SUBJECT A</Link></li>
                                        <li><Link className="dropdown-item" to="/">SUBJECT B</Link></li>
                                        <li><Link className="dropdown-item" to="/">SUBJECT C</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active effect" aria-current="page" to="/">TUTOR</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active effect" aria-current="page" to="/">STUDENTS</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active effect" aria-current="page" to="/">PARENTS</Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <Link className="btn btn-outline-primary button_style mx-4" to="/">Sign in</Link>
                                <Link className="btn btn-outline-primary button_style" to="/signup">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;