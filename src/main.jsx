import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StarRating from "./components/StarRating";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      {/* <StarRating maxRating={10} /> */}
      <App />
   </StrictMode>
);
