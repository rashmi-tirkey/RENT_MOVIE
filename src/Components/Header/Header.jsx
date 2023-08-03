import React, { useState } from "react"

import Register from "../Register/Register";
import Login from "../Login/Login"
import * as Constant from "./../../Constants/constants"

import "./Header.scss"

const Header = () => {
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const popupToggle = () => {
        setShowSignupModal(!showSignupModal);
    }

    const loginToggle = () => {
        setShowLoginModal(!showLoginModal)
    }

    const handleLogout = () => {
        localStorage.clear(Constant.NAME_KEY.nameKey);
        window.location.reload();
    }
    var username = localStorage.getItem(Constant.NAME_KEY.nameKey);

    return (
        <div>
            <div className="header-nav">
                <div>
                    <h4><i>{Constant.LOGO}</i></h4>
                </div>
                <div className="search">
                    <i className="fa fa-search search-icon" aria-hidden="true"></i>
                    <input className="search-input" type="text" placeholder={Constant.PLACEHOLDER.searchInput} />
                </div>
                <ul className="nav-bar">
                    <li className="nav-bar-list">Cart</li>
                    {username ? (<><li className="nav-bar-list">{username}
                    </li><li className="nav-bar-list " onClick={handleLogout}>{Constant.NAV_LIST.LOGOUT}
                        </li></>) : (
                        <li className="nav-bar-list" onClick={loginToggle}>{Constant.NAV_LIST.LOGIN}</li>)}
                    <li className="nav-bar-list" onClick={popupToggle}>{Constant.NAV_LIST.SIGNUP}</li>
                </ul>
            </div>
            {showLoginModal && <Login loginToggle={loginToggle} />}
            {showSignupModal && <Register popupToggle={popupToggle} />}
        </div>
    );
};

export default Header;