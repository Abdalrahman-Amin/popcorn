const WatchedMovie = ({ movie, onDeleteWatched }) => {
   return (
      <li>
         <img src={movie.poster} alt={`${movie.Title} poster`} />
         <h3>{movie.Title}</h3>
         <div>
            <p>
               <span>⭐️</span>
               <span>{movie.imdbRating.toFixed(2)}</span>
            </p>
            <p>
               <span>🌟</span>
               <span>{movie.userRating.toFixed(2)}</span>
            </p>
            <p>
               <span>⏳</span>
               <span>{movie.runtime} min</span>
            </p>

         <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)} title="Delete">X</button>
         </div>
      </li>
   );
};

export default WatchedMovie;
