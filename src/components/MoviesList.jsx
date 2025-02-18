import Movie from "./Movie";

const MoviesList = ({ movies, onSelectMovie }) => {
   return (
      <ul className="list">
         {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
         ))}
      </ul>
   );
};

export default MoviesList;
