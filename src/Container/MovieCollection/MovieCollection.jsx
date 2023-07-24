import React, { useEffect, useState } from "react"
import axios from "axios"

import * as Constant from './../../Constants/constants'

const MovieCollection = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        axios.get(Constant.MOVIE_LIST_API).then(res => {
            setMovieList(res.data)
        })
    }, [])

    return (
        <div className="movie-list">
            <ul>{movieList.map((item) => <li>{item.name}</li>)}</ul>
        </div>
    );
}

export default MovieCollection;