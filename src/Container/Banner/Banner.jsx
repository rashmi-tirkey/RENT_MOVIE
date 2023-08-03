import React, { useState, useEffect } from "react"
import Slider from "react-slick";
import axios from "axios"

import * as Constant from './../../Constants/constants'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

const Banner = () => {
    const [movieList, setMovieList] = useState([]);
    const [crouselData, setCrouselData] = useState([])

    useEffect(() => {
        axios.get(Constant.MOVIE_LIST_API).then(res => {
            setMovieList(res.data);
        })
    }, [])

    useEffect(() => {
        if (movieList.length) {
            let randomList = [];
            for (let i = 0; i < 10; i++) {
                const randomNumber = Math.floor((Math.random() * movieList.length));
                randomList.push(movieList[randomNumber]);
            }
            setCrouselData(randomList)
        }
    }, [movieList])


    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    return (
        <div >
            <Slider {...settings}>
                {crouselData.map((e) => {
                    return (
                        <>
                            <div>{e.title}</div>
                            {/* <div><img src={e.image} /></div> */}
                            <div>{e.info.genres.map((genresName) => {
                                return <div>{genresName}</div>
                            })} </div>
                        </>
                    )
                })}
            </Slider>
        </div>
    );
}

export default Banner;