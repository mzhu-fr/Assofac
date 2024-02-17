import { useEffect, useState } from 'react'
import '../styles/movie.css'
import axios from 'axios'

import { BsChatHeart } from 'react-icons/bs'
import { LuVote } from 'react-icons/lu'
import { BiSearchAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export const Movie = () => {

    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchMovie, setSearchMovie] = useState();
    const handleChange = (e) => {
        setSearchMovie(e.target.value)
        searchingMovie();
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    };
    const searchingMovie = () => {

        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&language=en-US&page=1`;


        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setData(json.results)
            })
            .catch(err => console.error('error:' + err));

    }
    const fetchMovie = () => {
        const fetch = require('node-fetch');

        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setData(json.results)
            })
            .catch(err => console.error('error:' + err));
    }

    useEffect(() => {
        fetchMovie()
    }, [])
    console.log(data);
    return (
        <div className="display-all-movies">
            <div className="research-movie">
                <input placeholder="search a movie" name="actor" onChange={handleChange} />
                <button className="search" onClick={searchingMovie}> <BiSearchAlt /></button>
            </div>
            <div className="display-movies">
                {data ? data.map((movie) => (
                    <div className="movie-card" key={movie.id} onClick={() => navigate("/movie/" + movie.id)}>
                        <div className="movie-title">
                            <h3>{movie.original_title}</h3>
                        </div>
                        <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt="" />
                        <div className="rating">
                            <p>{movie.vote_average} <BsChatHeart /></p>
                            <p>{movie.popularity} <LuVote /></p>
                        </div>
                    </div>
                )) : ""}
            </div>

        </div >
    )
}
