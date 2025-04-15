import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/teacher/classes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClasses(res.data); // El backend retorna el array directamente
      } catch (err) {
        setError("Error al cargar las clases.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Cargando clases...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Título + Botón */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h2 className="text-2xl font-bold">Mis Clases</h2>
        <Link
          to="/teacher/create-class"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
        >
          ➕ Crear Clase
        </Link>
      </div>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {classes.length === 0 ? (
        <p className="text-center">Aún no has creado ninguna clase.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {classes.map((classroom) => (
            <Link
              to={`/teacher/classes/${classroom.id}`}
              key={classroom.id}
              className="block bg-white rounded shadow p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{classroom.name}</h3>
              <p className="text-sm text-gray-700 mb-1">{classroom.description}</p>
              <p className="text-sm text-gray-500">
                Código: <span className="font-semibold">{classroom.group_code}</span>
              </p>
              <p className="text-sm text-gray-500">
                Carrera: {classroom.career} — Cuatrimestre: {classroom.cuatrimestre}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherClasses;
