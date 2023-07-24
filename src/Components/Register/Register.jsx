import React, { useState } from "react"
import { toast } from 'react-toastify';
import axios from "axios"

import * as Constant from './../../Constants/constants'

import "./Register.scss"

const Register = ({ popupToggle }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [success, setSuccess] = useState('');

    const [isError, isSetError] = useState({
        name: '',
        email: '',
        password: '',
        isEmailAvailable: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regExp = RegExp(
            /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        )
        setData({
            ...data,
            [e.target.name]: value
        });

        let error = "";
        switch (name) {
            case "name":
                error =
                    value.length < 4 ? Constant.SIGNUP_ERROR.NAME : "";
                break;
            case "email":
                error = regExp.test(value)
                    ? ""
                    : Constant.SIGNUP_ERROR.EMAIL;
                break;
            case "password":
                error =
                    value.length < 6 ? Constant.SIGNUP_ERROR.PASSWORD : "";
                break;
            default:
                break;
        }

        isSetError({
            ...isError,
            [name]: error
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password
        };

        const getUserEmail = await axios.get(Constant.USERS_API);
        let isEmail = getUserEmail.data.some((userEmail) => userEmail.email === data.email)

        if (!isEmail) {
            axios.post(Constant.USERS_API, userData).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setSuccess({
                        success: Constant.SIGNUP_SUCCESS_MESSAGE
                    });
                }
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });

        } else {
            isSetError({
                ...isError,
                isEmailAvailable: Constant.SIGNUP_ERROR.EXIT_EMAIL
            })
        }
    }

    return (
        <>
            <div className="modal">
                <div className="modal-content1">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="header">{Constant.SIGNUP_TITLE}</div>
                            <div className="close" onClick={popupToggle}>&times;</div>
                        </div>
                        {success && <div className="success">{Constant.SIGNUP_SUCCESS_MESSAGE}</div>}
                        <div className="modal-body">
                            <label className="label">{Constant.LABEL.FULL_NAME}</label>
                            <input type="text" placeholder={Constant.PLACEHOLDER.nameInput} name={Constant.NAME_KEY.nameKey} className="input-field"
                                value={data.name}
                                onChange={handleChange} />
                            {isError.name && (
                                <div className="invalid-feedback">{isError.name}</div>
                            )}

                            <label className="label">{Constant.LABEL.EMAIL_ID}</label>
                            <input type="text" placeholder={Constant.PLACEHOLDER.emailInput} name={Constant.NAME_KEY.emailKey} className="input-field"
                                value={data.email}
                                onChange={handleChange} />
                            {isError.email && (
                                <div className="invalid-feedback">{isError.email}</div>
                            )}

                            {isError.isEmailAvailable && (<div className="invalid-feedback">{isError.isEmailAvailable}</div>)}

                            <label className="label">{Constant.LABEL.PASSWORD}</label>
                            <input type="password" placeholder={Constant.PLACEHOLDER.passwordInput} name={Constant.NAME_KEY.passwordKey} className="input-field" value={data.password}
                                onChange={handleChange} />

                            {isError.password && (
                                <div className="invalid-feedback">{isError.password}</div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSubmit} className="save-btn" >{Constant.REGISTER_BTN}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;




// which all section
// what are these
// 8D
// 24B