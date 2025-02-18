import { useEffect, useState } from "react";
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
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function App() {
   const [movies, setMovies] = useState([]);
   const [watched, setWatched] = useState([]);
   const [selectedId, setSelectedId] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [query, setQuery] = useState("");


   useEffect(function () {
      const controller = new AbortController();
      const fetchMovies = async (key) => {
         try {
            setError("");
            setIsLoading(true);
            const res = await fetch(
               `https://www.omdbapi.com/?apikey=${key}&s=${query}`
               , { signal: controller.signal });
            if (!res.ok) {
               throw new Error("Something went wrong with fetching movies");
            }
            const data = await res.json();

            if (data.Response === "False") {
               throw new Error("Movie Not Found!");
            }
            setMovies(data.Search);
            setError("")
         } catch (error) {
            if (error.name !== "AbortError") {
               setError(error.message);
               console.log("error while fetching data", error);
            }
         } finally {
            setIsLoading(false);
         }
      };
      if (query.length < 3) {
         setMovies([]);
         setError("");
         return;
      }
      handleCloseMovie();
      fetchMovies(API_KEY);


      return function () {
         controller.abort();
      }
   }, [query]);

   function handleSelectMovie(id) {
      setSelectedId(selectedId === id ? null : id);
   }

   function handleCloseMovie() {
      setSelectedId(null);
   }

   function handleAddWatched(movie) {
      setWatched((watched) => [...watched, movie]);
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
