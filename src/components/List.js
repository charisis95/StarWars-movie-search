import React from 'react';
import '../List.css';

function List({ data, loading, onMovieSelect, order,selectedMovie  }) {

    const sortedData = [...data].sort((a, b) => {
        if (order === 'episode') {
          return a.episode_id - b.episode_id;
        } else if (order === 'release_date') {
          return new Date(a.release_date) - new Date(b.release_date);
        }
    });

    return(
        <div className='left-container'>
          {/* if loading is true then have loader */}
        {loading ? (
        <div className="loader">
          <li className="ball"></li>
          <li className="ball"></li>
          <li className="ball"></li>
        </div>
      ) : (
        <div className="card" >
          {sortedData.map((item) => (
            <div className={`element ${item === selectedMovie ? 'active' : ''}`} key={item.episode_id} onClick={() => onMovieSelect(item)}>
               <div className='episode-class'>EPISODE {item.episode_id}</div>
               <div className='title-class'>{item.title}</div>
               <div className='release-class'>{item.release_date}</div>
            </div>
          ))}
        </div>
      )}
      </div>
    );
}
export default List;