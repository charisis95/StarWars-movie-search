import React from 'react';
import '../Details.css';

function Detail({ selectedMovie,poster }) {
    return(
        <div>
            {selectedMovie ? (
                <div className='details-container'>
                    <h2 className='title'>{selectedMovie.title}</h2>
                    {poster.Poster && <img className='image-poster' src={poster.Poster} alt="Movie Poster" />}
                    <div className='info'>Opening Crawl: {selectedMovie.opening_crawl}</div>
                    <div className='director'>Director: {selectedMovie.director}</div>
                </div>
            ) : (
                <p>Select a movie to view details.</p>
            )}
        </div>
    )
}
export default Detail;