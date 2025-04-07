import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const CreateMaterialView = () => {
  // Datos de ejemplo para los temas disponibles
  const temasDisponibles = [
    { id: 1, nombre: "EVALUACIÓN FINAL" },
    { id: 2, nombre: "GRÁFICAS" },
    { id: 3, nombre: "ÁLGEBRA LINEAL" },
  ];

  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    temaId: "",
    archivos: []
  });

  // Estado para errores de validación
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar selección de archivos
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      archivos: [...e.target.files]
    });
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) newErrors.titulo = "El título es obligatorio";
    if (!formData.temaId) newErrors.temaId = "Debes seleccionar un tema";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulación de envío exitoso
      setMessage("✅ Material publicado correctamente");
      console.log("Formulario válido:", formData);
      
      // Resetear formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          titulo: "",
          descripcion: "",
          temaId: "",
          archivos: []
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
                Agregar material de clase
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
              {/* Selector de Tema */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Tema*
                </label>
                <select
                  name="temaId"
                  value={formData.temaId}
                  onChange={handleChange}
                  className={`w-full border ${errors.temaId ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                >
                  <option value="">Selecciona un tema</option>
                  {temasDisponibles.map(tema => (
                    <option key={tema.id} value={tema.id}>{tema.nombre}</option>
                  ))}
                </select>
                {errors.temaId && <p className="text-red-500 text-sm mt-1">{errors.temaId}</p>}
              </div>

              {/* Campo Título */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Título*
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className={`w-full border ${errors.titulo ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Ej: Guía de estudio"
                />
                {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
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
                  placeholder="Descripción del material"
                />
              </div>

              {/* Adjuntar archivos */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Archivos (opcional)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png,.zip"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-red-50 file:text-red-700
                    hover:file:bg-red-100"
                />
                {formData.archivos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Archivos seleccionados: {formData.archivos.length}
                    </p>
                    <ul className="text-xs text-gray-500 mt-1">
                      {Array.from(formData.archivos).map((file, index) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Botón de enviar */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Publicar Material
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateMaterialView;