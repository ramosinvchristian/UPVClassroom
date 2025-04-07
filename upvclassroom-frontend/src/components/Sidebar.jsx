import { Link, useLocation } from "react-router-dom";
import { 
  FaChalkboardTeacher, 
  FaPlusCircle, 
  FaBook, 
  FaSignOutAlt,
  FaCalendarAlt,
  FaHome,
  FaBullhorn
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user?.role || "student";
  const location = useLocation();

  // Función para estilos de los links con hover parcial
  const getLinkClass = (path) => 
    `flex items-center gap-3 py-3 pr-4 pl-8 rounded-r-xl transition-all ${
      location.pathname.startsWith(path) 
        ? "bg-blue-100 text-blue-600 font-medium"
        : "hover:bg-gray-100"
    }`;

  // Estilo para elementos no clickables
  const menuItemClass = "relative -ml-4 pl-6 hover:bg-gray-100 rounded-r-3xl transition-all mr-4";

  return (
    <div className="bg-white text-gray-800 w-64 h-screen fixed top-14 overflow-y-auto border-r border-gray-400">
      {/* Encabezado */}
      <div className="border-b border-gray-400">
        <div className="flex flex-col pb-4 pt-14">
          {/* Item Inicio */}
       
          <Link to="/teacher/home" className={menuItemClass}>
            <div className="flex items-center gap-6 py-2.5 pr-4 pl-4">
              <FaHome className="text-xl text-gray-600" />
              <p className="font-medium">Inicio</p>
            </div>
          </Link>

          {/* Item Avisos */}
          <div className={menuItemClass}>
            <div className="flex items-center gap-6 py-2.5 pr-4 pl-4">
              <FaBullhorn className="text-xl text-gray-600" />
              <p className="font-medium">Avisos</p>
            </div>
          </div>
        </div>
      </div>

       {/* Menú principal */}
       <div className="flex flex-col pt-3.5">
        {/* Sección Clases */}
        <div className={menuItemClass}>
          <div className="flex items-center gap-6 py-2.5 pr-4 pl-4">
            <FaBook className="text-xl text-gray-600" />
            <p className="font-medium">Clases</p>
          </div>
        </div>

        {/* Sección Tareas pendientes */}
        <div className={menuItemClass}>
          <div className="flex items-center gap-6 pt-2.5 pb-2 pr-4 pl-4">
            <FaCalendarAlt className="text-xl text-gray-600" />
            <p className="font-medium">Tareas pendientes</p>
          </div>
          
          {/* Lista de clases - Estilo Google Classroom */}
          <div className="ml-3 mt-2 mb-3">
            {/* Tarjeta de clase 1 */}
            <div className="flex items-start gap-2 px-2 pb-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex-shrink-0 w-9 h-9 bg-[#CD2E2E] rounded-full flex items-center justify-center text-white font-semibold">
                E
              </div>
              <div>
                <p className="font-medium text-sm">English VIII</p>
                <p className="text-xs text-gray-500">UPV Language Department</p>
              </div>
            </div>

            {/* Tarjeta de clase 2 */}
            <div className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex-shrink-0 w-9 h-9 bg-[#EDBD3B] rounded-full flex items-center justify-center text-white font-semibold">
                M
              </div>
              <div>
                <p className="font-medium text-sm">Matemáticas Avanzadas</p>
                <p className="text-xs text-gray-500">UPV Science Faculty</p>
              </div>
            </div>

            {/* Tarjeta de clase 3 */}
            <div className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex-shrink-0 w-9 h-9 bg-[#98C14C] rounded-full flex items-center justify-center text-white font-semibold">
                D
              </div>
              <div>
                <p className="font-medium text-sm">DI 2025 1</p>
                <p className="text-xs text-gray-500">ITI</p>
              </div>
            </div>

            {/* Tarjeta de clase 4 */}
            <div className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex-shrink-0 w-9 h-9 bg-[#2694B9] rounded-full flex items-center justify-center text-white font-semibold">
                T
              </div>
              <div>
                <p className="font-medium text-sm">Tecnologías de la Virtu...</p>
                <p className="text-xs text-gray-500">ITI-271318</p>
              </div>
            </div>

            {/* Tarjeta de clase 5 */}
            <div className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex-shrink-0 w-9 h-9 bg-[#F45799] rounded-full flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div>
                <p className="font-medium text-sm">Sistemas Inteligentes...</p>
                <p className="text-xs text-gray-500">8-1</p>
              </div>
            </div>

            {/* Tarjeta de clase 5 */}
            <div className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex-shrink-0 w-9 h-9 bg-[#9D4ACE] rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div>
                <p className="font-medium text-sm">TUT 8 SepDic 2025...</p>
                <p className="text-xs text-gray-500">Turorias</p>
              </div>
            </div>
          </div>
        </div>


        
      </div>

      <div className="border-b border-gray-400">
       
      </div>

      <div className="flex flex-col pt-3.5">
  
      <Link to="/" className={menuItemClass}> 
          <div className="flex items-center gap-6 pt-2.5 pb-2 pr-4 pl-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">Cerrar sesión</p>
          </div>
          </Link>
          </div>

      {/* ... (sección de cierre de sesión se mantiene igual) ... */}
    </div>
    
  );
};

export default Sidebar;