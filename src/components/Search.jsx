import {  useRef } from "react";
import { useKey } from "../hooks/useKey";

const Search = ({ placeholder, query, setQuery }) => {
   const inputEl = useRef(null);

   function handleKeydown() {
         if (document.activeElement === inputEl.current) return;
         setQuery("");
         inputEl.current.focus();
   }

   useKey("Enter", handleKeydown);

   return (
      <input
         ref={inputEl}
         className="search"
         type="text"
         placeholder={placeholder}
         value={query}
         onChange={(e) => setQuery(e.target.value)}
      />
   );
};

export default Search;
