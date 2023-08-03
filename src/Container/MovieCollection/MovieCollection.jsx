import React, { useEffect, useState } from "react"
import axios from "axios"
import Slider from "react-slick";

//Image
import bgImage from "./../../Asset/bg.jpg"
import bg1Image from "./../../Asset/bg1.jpg"
import bg2Image from "./../../Asset/bg2.jpg"
import bg3Image from "./../../Asset/bg3.jpg"
import bg4Image from "./../../Asset/bg4.jpg"

import * as Constant from './../../Constants/constants'

export const Image = [
    {
        img: bg1Image
    },
    {
        img: bg2Image
    },
    {
        img: bg3Image
    },
    {
        img: bgImage
    },
    {
        img: bg4Image
    }
]

const MovieCollection = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        axios.get(Constant.MOVIE_LIST_API).then(res => {
            setMovieList(res.data)
        })
    }, [])

    useEffect(() => {
        movieList.forEach((item) => {
            const img = item.image === typeof "item.image"
            if (img) {
                item.image = [item.image]
            }

        });
    }, [movieList])

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };

    return (
        <div className="movie-list">
            {/* <ul>{movieList.map((item) => <li>{item.name}</li>)}</ul> */}

            <Slider {...settings}>
                {
                    Image.map((item) =>
                        <div>
                            <img src={item.img} />
                        </div>
                    )}
            </Slider>
        </div>
    );
}

export default MovieCollection;