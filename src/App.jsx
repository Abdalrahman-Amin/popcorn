import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
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
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function App() {
   const [movies, setMovies] = useState([]);
   const [watched, setWatched] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [query, setQuery] = useState("");

   const tempQuery = "ashdsjh";

   useEffect(() => {
      const fetchMovies = async (key) => {
         try {
            setError("");
            setIsLoading(true);
            const res = await fetch(
               `https://www.omdbapi.com/?apikey=${key}&s=${query}`
            );
            if (!res.ok) {
               throw new Error("Something went wrong with fetching movies");
            }
            const data = await res.json();
            console.log(data);
            if (data.Response === "False") {
               throw new Error("Movie Not Found!");
            }
            setMovies(data.Search);
         } catch (error) {
            setError(error.message);
            console.error("error while fetching data", error);
         } finally {
            setIsLoading(false);
         }
      };
      if (query.length < 3) {
         setMovies([]);
         setError("");
         return;
      }

      fetchMovies(API_KEY);
   }, [query]);

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
               {!error && !isLoading && <MoviesList movies={movies} />}
            </Box>
            <Box>
               <WatchedSummary watched={watched} />
               <WatchedMoviesList watched={watched} />
            </Box>
         </MainContent>
      </>
   );
}
