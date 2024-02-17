import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BsChatHeart } from 'react-icons/bs'
import { LuVote } from 'react-icons/lu'
import { BiSearchAlt } from 'react-icons/bi'

export const OneMovie = () => {

    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    const location = useLocation()

    const navigate = useNavigate();

    const movieId = location.pathname.split("/")[2]
    const [movieData, setMovieData] = useState({});
    const [actors, setActors] = useState({})
    const [recommend, setRecommend] = useState({})

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    };

    const getMovie = () => {
        const fetch = require('node-fetch');
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setMovieData(json)
            })
            .catch(err => console.error('error:' + err));
    }

    const getActors = () => {
        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setActors(json)
            })
            .catch(err => console.error('error:' + err));
    }

    const getRecommendation = () => {
        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setRecommend(json.results)
            })
            .catch(err => console.error('error:' + err));
    }

    const handleClick = (id) => {
        navigate("/movie/" + id);
        window.location.reload();
    }
    useEffect(() => {
        getMovie();
        getActors();
        getRecommendation();
    }, [])

    console.log(actors)
    return (
        <div className="display-one-movie-page">
            {movieData ?
                <div className="presentation" key={movieId}>
                    <div className="image-background">
                        <img src={`https://image.tmdb.org/t/p/w780${movieData.backdrop_path}`} alt={movieData.id} />
                        <div className="movie-details">
                            <div> TITLE : {movieData.title} </div>
                            <div className="genre">Genre :  {movieData.genres ? movieData.genres.map((genre) => (
                                <p key={genre.id}>{genre.name} </p>
                            )) : ""}
                            </div>
                            <div>Release date : {movieData.release_date}</div>
                            <div>Popularity : {movieData.popularity}</div>
                            <div>Vote : {movieData.vote_count} </div>

                        </div>
                    </div>
                    <div className="desc">
                        <p> {movieData.overview}</p>
                    </div>
                    <div className="actor-list">
                        <div> <h3>CAST</h3> </div>
                        <div className="wrap-actor">
                            {actors.cast ? actors.cast.map((actor) => (
                                <div className="actor-display" key={actor.id}>
                                    <p>{actor.name}</p>
                                    {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w780${actor.profile_path}`} alt={actor.name} />}
                                </div>
                            )) : ""}
                        </div>
                    </div>
                    <div className="recommendation">
                        <h3>RECOMMENDATION</h3>
                        <div className="recommendation">
                            {recommend[0] ? recommend.map((movie) => (
                                <div className="movie-card" key={movie.id} onClick={() => handleClick(movie.id)}>
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

                    </div>
                </div>
                : ""}
        </div >
    )
}
