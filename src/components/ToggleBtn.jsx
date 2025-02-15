const ToggleBtn = ({ isOpen, onOpen }) => {
   return (
      <button className="btn-toggle" onClick={onOpen}>
         {isOpen ? "–" : "+"}
      </button>
   );
};

export default ToggleBtn;
