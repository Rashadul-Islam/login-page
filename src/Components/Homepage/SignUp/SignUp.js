import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import "./SignUp.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faMobile, faUser } from '@fortawesome/free-solid-svg-icons';
import { secure } from './bcrypt';

const SignUp = () => {

    const [regUser, setRegUser] = useState({
        cat: "",
        name: "",
        email: "",
        phone: "",
        pass: ""
    })

    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    const handleBlur = (event) => {
        const newUser = { ...regUser };
        newUser[event.target.name] = event.target.value;
        setRegUser(newUser);
    }

    useEffect(() => {
        if (regUser.phone !== '') {
            fetch(`https://damp-dawn-23760.herokuapp.com/user/${regUser.phone}`)
                .then(res => res.json())
                .then(data => setMobile(data.phone))
                .catch(err => setMobile(""))
        }

    }, [regUser.phone])

    useEffect(() => {
        if (regUser.email !== '') {
            fetch(`https://damp-dawn-23760.herokuapp.com/users/${regUser.email}`)
                .then(res => res.json())
                .then(data => setEmail(data.email))
                .catch(err => setEmail(""))
        }

    }, [regUser.email])

    const mobileValidate = () => {
        const mobileNumber = regUser.phone;
        const check = mobileNumber.length >= 11 ? mobileNumber.substring(mobileNumber.length - 11) : mobileNumber;
        const dataPhone = mobile.length >= 11 ? mobile.substring(mobile.length - 11) : mobile;
        const reg = /(^(\+8801|01))[1|3-9]{1}(\d){8}$/;
        if (reg.test(mobileNumber)) {
            if (check === dataPhone) {
                alert("This Number Already Taken!!!");
            }
            else {
                return true;
            }
        }
        else {
            alert("please correct your mobile number!!!");
        }
    }

    const emailCheck = () => {
        if (email === regUser.email) {
            alert("email already taken!!!");
        }
        else {
            return true;
        }
    }

    const passwordValid = () => {
        const password = regUser.pass;
        const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (password.length < 6 || password.length > 16) {
            alert('password length must greater than 6 and less than 16');
        }
        else {
            if (reg.test(password)) {
                return true;
            }
            else {
                alert("password must contain atleast one number and one special character");
            }
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (mobileValidate() && emailCheck() && passwordValid()) {
            const newUser = { ...regUser };
            const getHash = (secure(newUser.pass));
            getHash.then(function (result) {
                const data = { ...regUser }
                data.pass = result;
                const url = "https://damp-dawn-23760.herokuapp.com/signup"
                fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        alert('Registration Complete!!!');
                        document.getElementById("myForm").reset();
                    })
            })
        }
    }
    return (
        <div>
            <Header />
            <div className="d-flex justify-content-center">
                <Link className="heading underline" to="/">SIGN IN</Link>
                <p className="heading px-3">|</p>
                <Link className="heading underline" to="/signup">SIGN UP</Link>
            </div>
            <div className="signup">
                <form className="sign_form" onSubmit={handleSubmit} id="myForm">
                    <p className="pt-3 font_style">I am a:</p>
                    <div className="d-flex">
                        <div className="form-check">
                            <input onBlur={handleBlur} className="form-check-input" type="radio" name="cat" value="Student" required />
                            <label className="form-check-label font_style">
                                Student
                            </label>
                        </div>
                        <div className="form-check">
                            <input onBlur={handleBlur} className="form-check-input" type="radio" value="Parent" name="cat" required />
                            <label className="form-check-label font_style">
                                Parent
                            </label>
                        </div>
                        <div className="form-check">
                            <input onBlur={handleBlur} className="form-check-input" type="radio" value="Tutor" name="cat" required />
                            <label className="form-check-label font_style">
                                Tutor
                            </label>
                        </div>
                    </div>
                    <div className="text mt-2">
                        <input className="form-control" type="text" name="name" onBlur={handleBlur} placeholder="Enter your full name" required />
                        <FontAwesomeIcon className="i" icon={faUser} />
                    </div>
                    <div className="email mt-2">
                        <input className="form-control" type="email" name="email" onBlur={handleBlur} placeholder="Enter your email address" required />
                        <FontAwesomeIcon className="i" icon={faEnvelope} />
                    </div>
                    <div className="phone mt-2">
                        <input className="form-control" type="tel" name="phone" onBlur={handleBlur} placeholder="Enter your mobile number" required />
                        <FontAwesomeIcon className="i" icon={faMobile} />
                    </div>
                    <div className="password mt-2">
                        <input className="form-control" type="password" name="pass" onBlur={handleBlur} placeholder="Enter your password" required />
                        <FontAwesomeIcon className="i" icon={faLock} />
                    </div>
                    <p className="pt-2"><small>Already have an account?<Link className="link-style px-1" to="/">Sign in</Link></small></p>
                    <small>By creating an account, you agree to</small><br />
                    <small>Tutory's User <span>Privacy Policy</span> and <span>Terms and Conditions.</span></small>
                    <button type="submit" className="btn btn-primary Sign_button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;