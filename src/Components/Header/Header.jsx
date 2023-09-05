import React, { useState } from "react"

//Component
import Register from "../Register/Register";
import Login from "../Login/Login";
import SearchBar from "../SearchBar/SearchBar";
import SearchList from "../SearchList/SearchList"

//Constant
import * as Constant from "./../../Constants/constants"

import "./Header.scss"

const Header = () => {
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [results, setResults] = useState([]);

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
                <SearchBar setResults={setResults} />
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
            {results && results.length > 0 && <SearchList results={results} />}
        </div>
    );
};

export default Header;