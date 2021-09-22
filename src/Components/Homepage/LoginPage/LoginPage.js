import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import "./LoginPage.css";
import { fbSIgnIn, googleSIgnIn } from './firebase.config';
import { passMatch } from '../SignUp/bcrypt';

const LoginPage = () => {
    const [login, setLogin] = useState({
        email: "",
        pass: ""
    })

    const [loginInfo, setLoginInfo] = useState([]);

    const handleBlur = (event) => {
        const logInUser = { ...login };
        logInUser[event.target.name] = event.target.value;
        setLogin(logInUser);
    }

    useEffect(() => {
        if (login.email !== '') {
            fetch(`https://damp-dawn-23760.herokuapp.com/users/${login.email}`)
                .then(res => res.json())
                .then(data => setLoginInfo(data))
                .catch(err => setLoginInfo(null))
        }

    }, [login.email])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginInfo !== null && login.email === loginInfo.email) {

            const match = passMatch(login.pass, loginInfo.pass);
            match.then(function (result) {
                if (result) {
                    alert("success!!!");
                    document.getElementById("myForm").reset();
                }
                else {
                    alert("Invalid Credential!!");
                }
            })
        }
        else {
            alert("Invalid Credential!!!");
        }
    }
    return (
        <div>
            <Header></Header>
            <div className="d-flex justify-content-center">
                <Link className="heading underline" to="/">SIGN IN</Link>
                <p className="heading px-3">|</p>
                <Link className="heading underline" to="/signup">SIGN UP</Link>
            </div>
            <div className="login d-flex justify-content-between">
                <div>
                    <p className="card-text">Sign in with Social Account</p>
                    <ul className="ul-style">
                        <li><button onClick={googleSIgnIn} className="social-login rounded-pill bg-danger btn"><FontAwesomeIcon icon={faGooglePlusG} /><span className="px-3">Sign in with google</span></button>
                        </li>
                        <li><button onClick={fbSIgnIn} className="social-login rounded-pill bg-primary btn"><FontAwesomeIcon icon={faFacebookF} /><span className="px-3">Sign in with Facebook</span></button></li>
                        <li>
                            <button className="social-login rounded-pill bg-info btn"><FontAwesomeIcon icon={faLinkedinIn} /><span className="px-3">Sign in with Linkedin</span></button>
                        </li>
                    </ul>
                    <p>Are you new? <Link className="link-style" to="/signup">Sign up</Link></p>
                </div>
                <div className="line">
                    <hr className="line-style" width="2" size="50" />
                    <p className="or_text">OR</p>
                    <hr className="line-style" width="2" size="50" />
                </div>
                <div className="form-width">
                    <p className="card-text">Sign in with your email and password</p>
                    <form onSubmit={handleSubmit} id="myForm">
                        <div className="email">
                            <input className="form-control email_icon" name="email" onBlur={handleBlur} type="email" placeholder='Enter your email' required />
                            <FontAwesomeIcon className="i" icon={faEnvelope} />
                        </div>
                        <br />
                        <div className="password">
                            <input className="form-control" type="password" name="pass" onBlur={handleBlur} placeholder="Enter your password" required />
                            <FontAwesomeIcon className="i" icon={faLock} />
                        </div>
                        <br />
                        <div className="d-flex justify-content-between">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label">Remember me</label>
                            <Link className="link-style" to="/">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn btn-secondary btn_style">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;