import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const CreateTemaView = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    color: "red" // Color por defecto
  });

  // Estado para errores y mensajes
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Opciones de colores
  const coloresDisponibles = [
    { codigo: "red", nombre: "Rojo" },
    { codigo: "blue", nombre: "Azul" },
    { codigo: "green", nombre: "Verde" },
    { codigo: "yellow", nombre: "Amarillo" },
    { codigo: "purple", nombre: "Morado" }
  ];

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre del tema es obligatorio";
    if (formData.nombre.length > 50) newErrors.nombre = "El nombre es demasiado largo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulación de envío exitoso
      setMessage("✅ Tema creado correctamente");
      console.log("Formulario válido:", formData);
      
      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          nombre: "",
          descripcion: "",
          color: "red"
        });
        setMessage("");
      }, 3000);
    }
  };

  return (
    <Layout>
      <div className="ml-64 pb-8 pt-2 px-8 bg-white min-h-[calc(100vh-4rem)]">
        <div className="max-w-3xl mx-auto">
          {/* Título con estilo similar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Crear Nuevo Tema
              </h2>
              <div className="w-20 h-1 bg-red-500 mt-2"></div>
            </div>
            <Link 
              to="/teacher/classwork" 
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Cancelar
            </Link>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div className={`mb-6 p-3 rounded-lg ${
              message.includes("✅") 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              {/* Campo Nombre del Tema */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre del Tema*
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Ej: EVALUACIÓN FINAL"
                  maxLength="50"
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                <p className="text-xs text-gray-500 mt-1">{formData.nombre.length}/50 caracteres</p>
              </div>

              {/* Campo Descripción */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Descripción opcional del tema"
                />
              </div>

              

              {/* Botón de enviar */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Crear Tema
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTemaView;