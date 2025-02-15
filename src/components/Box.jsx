import { useState } from "react";
import ToggleBtn from "./ToggleBtn";

const Box = ({ children }) => {
   const [isOpen, setIsOpen] = useState(true);
   return (
      <div className="box">
         <ToggleBtn isOpen={isOpen} onOpen={() => setIsOpen((open) => !open)} />
         {isOpen && children}
      </div>
   );
};

export default Box;
