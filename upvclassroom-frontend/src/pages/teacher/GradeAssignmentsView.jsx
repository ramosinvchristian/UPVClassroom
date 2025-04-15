import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const GradeAssignmentsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPeopleView = location.pathname.includes('people');
  const isClassworkView = location.pathname.includes('classwork');
  
  // Datos de ejemplo: tareas pendientes de calificación
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Examen teórico",
      description: "Responder las preguntas conceptuales",
      dueAt: "2023-11-30",
      submissions: [
        {
          id: 101,
          studentId: 1,
          studentName: "Juan Pérez",
          submittedAt: "2023-11-28T14:30:00",
          files: [
            { name: "respuestas_juan.pdf", type: "pdf" },
            { name: "codigo_fuente.zip", type: "zip" }
          ],
          grade: null,
          comments: ""
        },
        {
          id: 102,
          studentId: 2,
          studentName: "María García",
          submittedAt: "2023-11-29T09:15:00",
          files: [
            { name: "respuestas_maria.docx", type: "docx" }
          ],
          grade: 85,
          comments: "Buen trabajo, pero falta profundizar en la pregunta 3"
        }
      ]
    },
    {
      id: 2,
      title: "Proyecto práctico",
      description: "Implementar los algoritmos estudiados",
      dueAt: "2023-12-05",
      submissions: [
        {
          id: 201,
          studentId: 1,
          studentName: "Juan Pérez",
          submittedAt: "2023-12-04T16:45:00",
          files: [
            { name: "proyecto_juan.zip", type: "zip" }
          ],
          grade: null,
          comments: ""
        }
      ]
    }
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [commentsInput, setCommentsInput] = useState("");

  // Seleccionar una tarea para ver sus entregas
  const selectAssignment = (assignment) => {
    setSelectedAssignment(assignment.id === selectedAssignment?.id ? null : assignment);
    setSelectedSubmission(null);
    setGradeInput("");
    setCommentsInput("");
  };

  // Seleccionar una entrega para calificar
  const selectSubmission = (submission) => {
    setSelectedSubmission(submission.id === selectedSubmission?.id ? null : submission);
    setGradeInput(submission.grade !== null ? submission.grade.toString() : "");
    setCommentsInput(submission.comments || "");
  };

  // Guardar la calificación
  const saveGrade = () => {
    if (!selectedSubmission || gradeInput === "") return;

    const gradeValue = parseInt(gradeInput);
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) return;

    // Actualizar la calificación en el estado
    setAssignments(prevAssignments => 
      prevAssignments.map(assignment => {
        if (assignment.id !== selectedAssignment.id) return assignment;
        
        return {
          ...assignment,
          submissions: assignment.submissions.map(sub => {
            if (sub.id !== selectedSubmission.id) return sub;
            
            return {
              ...sub,
              grade: gradeValue,
              comments: commentsInput
            };
          })
        };
      })
    );

    // Resetear los inputs
    setGradeInput("");
    setCommentsInput("");
    setSelectedSubmission(null);
  };

  return (
    <Layout> 
      {/* Pestañas */}
      <div className="pl-[230px]">
      <div className="bg-white border-b">
  <div className="max-w-6xl mx-auto flex space-x-8">
    <Link 
      to="/teacher/class" 
      className={`py-4 px-1 border-b-2 font-medium ${
        !isPeopleView && !isClassworkView && !location.pathname.includes('grade')
          ? 'border-blue-500 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Muro
    </Link>
    
    <Link
      to="/teacher/classwork"
      className={`py-4 px-1 border-b-2 font-medium ${
        isClassworkView
          ? 'border-blue-500 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Trabajo en Clase
    </Link>
    
    <Link 
      to="/teacher/people" 
      className={`py-4 px-1 border-b-2 font-medium ${
        isPeopleView
          ? 'border-blue-500 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Personas
    </Link>
    
    <Link 
      to="/teacher/grade" 
      className={`py-4 px-1 border-b-2 font-medium ${
        location.pathname.includes('grade')
          ? 'border-blue-500 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Tareas Pendientes de Calificación
    </Link>
  </div>
</div>
      
        {!isPeopleView && (
          <div className="min-h-screen bg-white">
            {/* Contenido Principal - Diseño de dos columnas */}
            <div className="max-w-6xl mx-auto p-6 flex">
              {/* Columna izquierda - Lista de tareas */}
              <div className="flex-1 pr-6">
                <h2 className="text-2xl font-bold mb-6">Tareas pendientes de calificación</h2>
                
                <div className="space-y-4">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="bg-white rounded-lg overflow-hidden shadow border">
                      {/* Encabezado de la Tarea */}
                      <div 
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedAssignment?.id === assignment.id ? 'bg-red-50 border-l-4 border-red-500' : ''}`}
                        onClick={() => selectAssignment(assignment)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-xl font-semibold">{assignment.title}</h3>
                            <p className="text-gray-600 mt-1">{assignment.description}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-4">
                              {new Date(assignment.dueAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                            </span>
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              {assignment.submissions.filter(s => s.grade === null).length} por calificar
                            </span>
                            <svg 
                              className={`w-5 h-5 ml-4 transform ${selectedAssignment?.id === assignment.id ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Lista de Entregas */}
                      {selectedAssignment?.id === assignment.id && (
                        <div className="border-t">
                          {assignment.submissions.map(submission => (
                            <div 
                              key={submission.id}
                              className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''}`}
                              onClick={() => selectSubmission(submission)}
                            >
                              <div className="flex justify-between items-start">
                                {/* Información del estudiante */}
                                <div className="flex-1">
                                  <h4 className="font-medium">{submission.studentName}</h4>
                                  <p className="text-gray-600 text-sm mt-1">
                                    Entregado: {new Date(submission.submittedAt).toLocaleString('es-ES')}
                                  </p>
                                  
                                  {/* Archivos adjuntos */}
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {submission.files.map((file, index) => (
                                      <div key={index} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <span>{file.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Calificación */}
                                <div className="ml-4 text-right">
                                  {submission.grade !== null ? (
                                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                                      Calificación: {submission.grade}/100
                                    </span>
                                  ) : (
                                    <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                                      Pendiente
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna derecha - Panel de calificación */}
              <div className="w-96 flex-shrink-0">
                {selectedSubmission ? (
                  <div className="bg-white rounded-lg shadow border p-6 sticky top-6">
                    <h3 className="text-xl font-semibold mb-4">Calificar entrega de {selectedSubmission.studentName}</h3>
                    
                    <div className="space-y-4">
                      {/* Input para la calificación */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Calificación (0-100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          placeholder="0-100"
                        />
                      </div>
                      
                      {/* Input para comentarios */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Comentarios
                        </label>
                        <textarea
                          value={commentsInput}
                          onChange={(e) => setCommentsInput(e.target.value)}
                          rows="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          placeholder="Escribe tus comentarios aquí..."
                        />
                      </div>
                      
                      {/* Archivos adjuntos */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Archivos adjuntos:
                        </label>
                        <div className="space-y-2">
                          {selectedSubmission.files.map((file, index) => (
                            <div key={index} className="flex items-center p-2 border rounded hover:bg-gray-50">
                              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm">{file.name}</span>
                              <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm">
                                Descargar
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Botones de acción */}
                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          onClick={() => {
                            setSelectedSubmission(null);
                            setGradeInput("");
                            setCommentsInput("");
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={saveGrade}
                          className="px-4 py-2 bg-[#CD2E2E] text-white rounded-md hover:bg-red-700"
                        >
                          Guardar Calificación
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg border border-dashed p-6 text-center sticky top-6">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Selecciona una entrega</h3>
                    <p className="mt-1 text-sm text-gray-500">Elige una entrega de estudiante para comenzar a calificar</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GradeAssignmentsView;