import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";

const careers = ["Ingeniería en Sistemas", "Administración", "Contaduría"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

function CreateClassView() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    group_code: "",
    career: "",
    semester: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8000/api/classrooms",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Clase creada correctamente");
      setFormData({
        name: "",
        description: "",
        group_code: "",
        career: "",
        semester: "",
      });
    } catch (err) {
      setMessage("❌ Error al crear la clase");
    }
  };

  return (
    <Layout>
      <div className="ml-64 pb-8 pt-2 px-8 bg-white min-h-[calc(100vh-4rem)]">
        <div className="max-w-3xl mx-auto">
          {/* Título con botón Cancelar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Crear clase
              </h2>
              <div className="w-20 h-1 bg-blue-500 mt-2"></div>
            </div>
            <Link 
              to="/teacher/home" 
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Cancelar
            </Link>
          </div>

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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre de la clase
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Álgebra Lineal"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descripción opcional..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Código de grupo
                  </label>
                  <input
                    type="text"
                    name="group_code"
                    value={formData.group_code}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: MAT-2024-01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Carrera
                  </label>
                  <select
                    name="career"
                    value={formData.career}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona una carrera</option>
                    {careers.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Cuatrimestre
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona cuatrimestre</option>
                    {semesters.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Crear clase
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateClassView;