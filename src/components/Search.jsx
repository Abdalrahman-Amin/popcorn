import { useState } from "react";

const Search = ({ placeholder, query, setQuery }) => {
   return (
      <input
         className="search"
         type="text"
         placeholder={placeholder}
         value={query}
         onChange={(e) => setQuery(e.target.value)}
      />
   );
};

export default Search;
