import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


export function useMovies(query) {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");


   useEffect(function () {
      // cb?.(); // optional chaining
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
      fetchMovies(API_KEY);


      return function () {
         controller.abort();
      }
   }, [query]);


   return { movies, isLoading, error }
}