import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"

import * as Constant from './../../Constants/constants'

const Login = ({ loginToggle }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const ProceedLogin = async () => {
        if (validate()) {
            const getUser = await axios.get(Constant.USERS_API);
            let userDetail = getUser.data.find((userdata) => userdata.email === username);

            if (!userDetail) {
                toast.error(Constant.LOGIN_ERROR);
            } else if (userDetail.password === password) {
                toast.success(Constant.LOGIN_SUCCESS_MESSAGE);
                localStorage.setItem(Constant.NAME_KEY.nameKey, userDetail.name);
                localStorage.setItem(Constant.NAME_KEY.emailKey, userDetail.email);
                window.location.reload();
            } else {
                toast.error(Constant.LOGIN_ERROR.credential);
            }
            setUsername('');
            setPassword('');
        }
    }


    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.error(Constant.LOGIN_ERROR.username);
        }
        if (password === '' || password === null) {
            result = false;
            toast.error(Constant.LOGIN_ERROR.password);
        }
        return result;
    }

    return (
        <div className="modal">
            <div className="modal-content1">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="header">{Constant.LOGIN_TITLE}</div>
                        <div className="close" onClick={loginToggle}>&times;</div>
                    </div>
                    <div className="modal-body">
                        <label className="label">{Constant.LABEL.EMAIL_ID}</label>
                        <input type="text" placeholder={Constant.PLACEHOLDER.emailInput} name={Constant.NAME_KEY.emailKey} className="input-field"
                            value={username} onChange={e => setUsername(e.target.value)}
                        />

                        <label className="label">{Constant.LABEL.PASSWORD}</label>
                        <input type="password" placeholder={Constant.PLACEHOLDER.passwordInput} name={Constant.NAME_KEY.passwordKey} className="input-field"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button onClick={ProceedLogin} className="save-btn" >{Constant.LOGIN_BTN}</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;