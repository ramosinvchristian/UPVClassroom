import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StudentClassDetail() {
  const { id } = useParams(); // ID de la clase
  const [classroom, setClassroom] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchClassDetails();
  }, [id]);

  const fetchClassDetails = async () => {
    try {
      const classRes = await axios.get(`http://localhost:8000/api/student/classrooms/${id}`, { headers });
      const noticesRes = await axios.get(`http://localhost:8000/api/classrooms/${id}/notices`, { headers });

      setClassroom(classRes.data.classroom);
      setNotices(noticesRes.data);
    } catch (err) {
      console.error("Error al obtener datos de la clase", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando clase...</p>;
  if (!classroom) return <p className="text-center mt-10">Clase no encontrada.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-2">{classroom.name}</h2>
      <p className="text-center text-gray-600 mb-4">{classroom.description}</p>

      {/* Info general */}
      <div className="max-w-xl mx-auto bg-white rounded p-4 shadow mb-6">
        <p><strong>Código:</strong> {classroom.group_code}</p>
        <p><strong>Carrera:</strong> {classroom.career}</p>
        <p><strong>Cuatrimestre:</strong> {classroom.cuatrimestre}</p>
      </div>

      {/* Avisos */}
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-4">📢 Avisos:</h4>
        {notices.length === 0 ? (
          <p className="text-gray-600">No hay avisos publicados aún.</p>
        ) : (
          <ul className="space-y-4">
            {notices.map((notice) => (
              <li key={notice.id} className="border-b pb-2">
                <p className="text-lg font-semibold text-gray-800">{notice.title}</p>
                <p className="text-gray-700 text-sm">{notice.content}</p>

                {notice.attachment && (
                  <a
                    href={`http://localhost:8000/storage/${notice.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline mt-1 inline-block"
                  >
                    Ver archivo adjunto
                  </a>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  Publicado el {new Date(notice.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentClassDetail;
