import { useState } from "react";
import { Link } from "react-router-dom";
import upvlogo from "../../assets/upvlogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Solo para demostración - no hace nada realmente
    console.log("Credenciales ingresadas:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6b0c70]">
      <div className="w-full max-w-3xl mx-4 bg-white p-8 rounded-lg shadow-2xl shadow-gray-700 flex gap-8">
        
        {/* Lado izquierdo: Imagen y título */}
        <div className="w-80 flex flex-col items-start justify-start">
          <img src={upvlogo} alt="Logo de la institución" className="logo w-20" />
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">
            Iniciar sesión
          </h2>
          <p className="text-sm font-normal">Ingresa para comenzar tu sesión.</p>
        </div>

        {/* Lado derecho: Formulario */}
        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Correo electrónico..."
              />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contraseña..."
      
            />
          </div>

          <div className="pt-2 flex justify-end">
          <Link to="/teacher/home" >
            <button
              type="submit"
              className="w-36 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition duration-200"
            >
              Iniciar sesión
            </button>
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;