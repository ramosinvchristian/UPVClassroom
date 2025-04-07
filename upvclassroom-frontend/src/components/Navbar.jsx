import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import upvlogo from "../assets/upvlogo.png";

const Navbar = () => {
  return (
    <nav className="bg-white text-black p-4 fixed w-full top-0 z-10 border-b border-gray-400 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sección izquierda - Logo y título */}
        <div className="flex items-center space-x-3">
          <img src={upvlogo} alt="Logo UPV" className="w-12 h-auto" />
          <Link 
            to="/" 
            className="text-xl font-semibold text-gray-800 transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
          UPV Classroom
          </Link>
        </div>

        {/* Sección derecha - Navegación */}
        <div className="flex items-center space-x-6">
          
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.href = "/teacher/create-class";
            }}
            className="text-gray-700 transition-colors flex items-center pr-6"
            
          >
            <FaPlus size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;