import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentHome() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/student/classes", { headers });
      setClasses(res.data.classes || []);
    } catch (err) {
      console.error("Error al obtener clases del estudiante", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Mis Clases</h2>

      {loading ? (
        <p className="text-center">Cargando clases...</p>
      ) : classes.length === 0 ? (
        <p className="text-center text-gray-600">No estás inscrito a ninguna clase.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {classes.map((classroom) => (
            <div key={classroom.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-1">{classroom.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{classroom.description}</p>
              <p className="text-sm mb-2"><strong>Código:</strong> {classroom.group_code}</p>
              <p className="text-sm mb-2"><strong>Carrera:</strong> {classroom.career}</p>
              <p className="text-sm mb-4"><strong>Cuatrimestre:</strong> {classroom.cuatrimestre}</p>
              
              {/* Botón para ver clase */}
              <Link
                to={`/student/classes/${classroom.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Ver clase
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentHome;
