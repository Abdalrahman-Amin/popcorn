import { useState } from "react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import NumResults from "./components/NumResults";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
   const [watched, setWatched] = useLocalStorageState("watched", []);
   const [selectedId, setSelectedId] = useState(null);
   const [query, setQuery] = useState("");

   const { movies, isLoading, error } = useMovies(query);
   function handleSelectMovie(id) {
      setSelectedId(selectedId === id ? null : id);
   }

   function handleCloseMovie() {
      setSelectedId(null);
   }

   function handleAddWatched(movie) {
      setWatched((watched) => [...watched, movie]);
      // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
   }

   function handleDeleteWatched(id) {
      setWatched(watched => watched.filter(movie => movie.imdbID !== id));
   }

   return (
      <>
         <Navbar>
            <Logo />
            <Search
               placeholder="Search movies..."
               query={query}
               setQuery={setQuery}
            />
            <NumResults movies={movies} />
         </Navbar>
         <MainContent>
            <Box>
               {isLoading && !error && <Loader />}
               {error && <ErrorMessage message={error} />}
               {!error && !isLoading && <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />}
            </Box>
            <Box>
               {selectedId ? (
                  <MovieDetails
                     selectedId={selectedId}
                     onCloseMovie={handleCloseMovie}
                     onAddWatched={handleAddWatched}
                     watched={watched}
                  />
               ) : (
                  <>
                     <WatchedSummary watched={watched} />
                     <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
                  </>
               )
               }
            </Box>
         </MainContent>
      </>
   );
}
