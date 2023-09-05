import React, { useState } from 'react'
import axios from "axios"

import * as Constant from "./../../Constants/constants"

const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        axios.get(Constant.MOVIE_LIST_API)
            .then((response) => {
                const results = response.data.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.title &&
                        user.title.includes(value)
                    );
                });
                setResults(results);
            });
    };

    const handleChange = e => {
        const value = e.target.value;
        setInput(value)
        fetchData(value)
    }
    return (
        <div className="search">
            <i className="fa fa-search search-icon" aria-hidden="true"></i>
            <input
                className="search-input"
                value={input}
                placeholder={Constant.PLACEHOLDER.searchInput}
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchBar;
