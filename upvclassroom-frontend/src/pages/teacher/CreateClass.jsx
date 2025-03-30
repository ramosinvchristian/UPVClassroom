import { useState } from "react";
import axios from "axios";

const careers = ["Ingeniería en Sistemas", "Administración", "Contaduría"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

function CreateClass() {
const [formData, setFormData] = useState({
  name: "",
  description: "",
  group_code: "",
  career: "",
  cuatrimestre: "", // antes decía "semester"
});

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Limpiar mensaje al cambiar campos
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/classrooms", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mensaje temporal y redirección
      setMessage("✅ Clase creada correctamente.");
      setError(false);

      setTimeout(() => {
        window.location.href = "/teacher/classes";
      }, 1000);
    } catch (err) {
      setMessage("❌ Error al crear la clase.");
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Crear Nueva Clase</h2>

        {message && (
          <p className={`text-center mb-4 ${error ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Nombre de la clase"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="text"
          name="group_code"
          placeholder="Código de grupo"
          value={formData.group_code}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        <select
          name="career"
          value={formData.career}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        >
          <option value="">Selecciona una carrera</option>
          {careers.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="cuatrimestre" // CAMBIO AQUÍ
          value={formData.cuatrimestre}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        >
          <option value="">Selecciona cuatrimestre</option>
          {semesters.map((s, i) => (
            <option key={i} value={s}>
              {s}° Cuatrimestre
            </option>
          ))}
        </select>


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Crear Clase
        </button>
      </form>
    </div>
  );
}

export default CreateClass;
