import React from "react"

import "./SearchList.scss"

const SearchList = ({ results }) => {

    return (
        <div className="serach-list">
            {
                results.map((movieTitle, index) => {
                    return (
                        <div className="title" key={index}>{movieTitle.title}</div>
                    )
                })
            }
        </div>
    )
}

export default SearchList;