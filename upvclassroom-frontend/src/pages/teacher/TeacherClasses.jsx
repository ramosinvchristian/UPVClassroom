import { useEffect, useState } from "react";
import axios from "axios";

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

        // 👇 Aquí se asume que el backend retorna un array directamente
        setClasses(res.data); // No res.data.classes
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
      <h2 className="text-2xl font-bold mb-6 text-center">Mis Clases</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {classes.length === 0 ? (
        <p className="text-center">Aún no has creado ninguna clase.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-bold mb-2">{classroom.name}</h3>
              <p className="text-sm text-gray-700 mb-1">{classroom.description}</p>
              <p className="text-sm text-gray-500">
                Código: <span className="font-semibold">{classroom.group_code}</span>
              </p>
              <p className="text-sm text-gray-500">
                Carrera: {classroom.career} — Cuatrimestre: {classroom.cuatrimestre}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherClasses;
