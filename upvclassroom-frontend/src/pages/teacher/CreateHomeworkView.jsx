import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const CreateTareaView = () => {
  // Datos de ejemplo para los temas disponibles
  const temasDisponibles = [
    { id: 1, nombre: "EVALUACIÓN FINAL" },
    { id: 2, nombre: "GRÁFICAS" },
    { id: 3, nombre: "ÁLGEBRA LINEAL" },
  ];

  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    instrucciones: "",
    temaId: "",
    fechaEntrega: "",
    horaEntrega: "",
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
    const ahora = new Date();
    const fechaEntrega = new Date(`${formData.fechaEntrega}T${formData.horaEntrega}`);

    if (!formData.titulo.trim()) newErrors.titulo = "El título es obligatorio";
    if (!formData.instrucciones.trim()) newErrors.instrucciones = "Las instrucciones son obligatorias";
    if (!formData.temaId) newErrors.temaId = "Debes seleccionar un tema";
    if (!formData.fechaEntrega) newErrors.fechaEntrega = "La fecha es obligatoria";
    if (!formData.horaEntrega) newErrors.horaEntrega = "La hora es obligatoria";
    if (fechaEntrega <= ahora) newErrors.fechaEntrega = "La fecha/hora debe ser futura";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulación de envío exitoso
      setMessage("✅ Tarea creada correctamente");
      // Aquí iría la llamada real a la API
      console.log("Formulario válido:", formData);
      
      // Resetear formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          titulo: "",
          instrucciones: "",
          temaId: "",
          fechaEntrega: "",
          horaEntrega: "",
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
        <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Crear nueva tarea
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
                  placeholder="Ej: Examen teórico"
                />
                {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
              </div>

              {/* Campo Instrucciones */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Instrucciones*
                </label>
                <textarea
                  name="instrucciones"
                  value={formData.instrucciones}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full border ${errors.instrucciones ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Descripción detallada de la tarea"
                />
                {errors.instrucciones && <p className="text-red-500 text-sm mt-1">{errors.instrucciones}</p>}
              </div>

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

              {/* Fecha y Hora de Entrega */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Fecha de entrega*
                  </label>
                  <input
                    type="date"
                    name="fechaEntrega"
                    value={formData.fechaEntrega}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full border ${errors.fechaEntrega ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                  {errors.fechaEntrega && <p className="text-red-500 text-sm mt-1">{errors.fechaEntrega}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Hora de entrega*
                  </label>
                  <input
                    type="time"
                    name="horaEntrega"
                    value={formData.horaEntrega}
                    onChange={handleChange}
                    className={`w-full border ${errors.horaEntrega ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                  {errors.horaEntrega && <p className="text-red-500 text-sm mt-1">{errors.horaEntrega}</p>}
                </div>
              </div>

              {/* Adjuntar archivos */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Archivos adjuntos (opcional)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-red-50 file:text-red-700
                    hover:file:bg-red-100"
                />
                {formData.archivos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Archivos seleccionados: {formData.archivos.length}</p>
                  </div>
                )}
              </div>

              {/* Botón de enviar */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Publicar Tarea
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTareaView;