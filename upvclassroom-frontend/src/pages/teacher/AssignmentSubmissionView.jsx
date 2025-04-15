import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

const AssignmentSubmissionView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { assignmentId } = useParams();
  const isPeopleView = location.pathname.includes('people');
  const isClassworkView = location.pathname.includes('classwork');

  // Datos de ejemplo de la tarea
  const [assignment, setAssignment] = useState({
    id: assignmentId,
    title: "Examen teórico",
    description: "Responder las preguntas conceptuales sobre los temas vistos en clase. Incluir ejemplos prácticos.",
    dueAt: "2023-12-15T23:59:00",
    attachments: [
      { name: "guia_examen.pdf", type: "pdf" },
      { name: "ejemplos_practicos.docx", type: "docx" }
    ],
    instructions: "Entregar en formato PDF con nombre en el formato: Apellido_Nombre_ExamenTeorico.pdf"
  });

  // Estados para el formulario de entrega
  const [files, setFiles] = useState([]);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [textResponse, setTextResponse] = useState("");

  // Calcular tiempo restante
  const dueDate = new Date(assignment.dueAt);
  const now = new Date();
  const timeRemaining = dueDate - now;
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const daysRemaining = Math.floor(hoursRemaining / 24);

  // Manejar selección de archivos
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setDraftSaved(false);
  };

  // Guardar borrador
  const saveDraft = () => {
    // Aquí iría la lógica para guardar en el backend
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  // Enviar tarea
  const submitAssignment = () => {
    setIsSubmitting(true);
    
    // Simular envío al backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus('success');
    }, 1500);
  };

  // Función para retroceder
  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <Layout>
      {/* Pestañas */}
      <div className="pl-[230px]">
    
      
        <div className="min-h-screen bg-white">
          {/* Contenido Principal */}
          <div className="max-w-7xl mx-auto px-8 py-6">
            {/* Encabezado con botón de retroceso */}
            <div className="mb-6 flex items-center">
              <button 
                onClick={handleGoBack}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
              </button>
              
              <h1 className="text-2xl font-bold">{assignment.title}</h1>
              
              {/* Indicador de tiempo restante */}
              <div className={`ml-auto inline-block px-3 py-1 rounded-full text-sm font-medium ${
                timeRemaining > 0 
                  ? (daysRemaining < 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800')
                  : 'bg-red-100 text-red-800'
              }`}>
                {timeRemaining > 0 ? (
                  <>
                    {daysRemaining > 0 ? `${daysRemaining} día(s) restante(s)` : `${hoursRemaining} hora(s) restante(s)`}
                  </>
                ) : (
                  "Tiempo de entrega vencido"
                )}
              </div>
            </div>

            {/* Diseño de dos columnas más amplio */}
            <div className="flex gap-10">
              {/* Columna izquierda - Instrucciones y detalles (más ancha) */}
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-lg shadow border p-8 mb-8">
                  <h2 className="text-xl font-semibold mb-6">Instrucciones</h2>
                  <div className="prose max-w-none text-gray-700 mb-6">
                    <p className="mb-4">{assignment.description}</p>
                    
                    {assignment.instructions && (
                      <>
                        <h3 className="font-medium text-lg mb-3">Requisitos específicos:</h3>
                        <p>{assignment.instructions}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Materiales adjuntos */}
                {assignment.attachments && assignment.attachments.length > 0 && (
                  <div className="bg-white rounded-lg shadow border p-8">
                    <h2 className="text-xl font-semibold mb-6">Materiales de la tarea</h2>
                    <div className="space-y-3">
                      {assignment.attachments.map((file, index) => (
                        <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <svg className="w-6 h-6 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="flex-1 text-gray-800">{file.name}</span>
                          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Descargar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Columna derecha - Formulario de entrega (más ancha) */}
              <div className="w-[500px] flex-shrink-0">
                <div className="bg-white rounded-lg shadow-lg border p-8 sticky top-8">
                  <h2 className="text-xl font-semibold mb-6">Tu trabajo</h2>
                  
                  {submissionStatus === 'success' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center">
                        <svg className="h-6 w-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-medium text-green-800">¡Entrega exitosa!</h3>
                          <p className="mt-1 text-green-700">
                            Tu tarea ha sido enviada correctamente. Recibirás una notificación cuando esté calificada.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleGoBack}
                        className="mt-4 w-full px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                      >
                        Volver a las tareas
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Campo para respuesta de texto */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Respuesta (opcional)
                        </label>
                        <textarea
                          value={textResponse}
                          onChange={(e) => setTextResponse(e.target.value)}
                          rows="6"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                          placeholder="Escribe tu respuesta aquí si la tarea no requiere archivos..."
                        />
                      </div>

                      {/* Subida de archivos */}
                      <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Archivos adjuntos
                        </label>
                        <div className="mt-1 flex justify-center px-8 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                          <div className="space-y-3 text-center">
                            <svg
                              className="mx-auto h-14 w-14 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                              >
                                <span>Sube un archivo</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  multiple
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">o arrástralo aquí</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {assignment.instructions.includes('PDF') ? 'Solo PDF hasta 10MB' : 'Cualquier formato hasta 10MB'}
                            </p>
                          </div>
                        </div>

                        {/* Lista de archivos seleccionados */}
                        {files.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <h4 className="text-sm font-medium text-gray-700">Archivos seleccionados:</h4>
                            {Array.from(files).map((file, index) => (
                              <div key={index} className="flex items-center p-3 border rounded-lg text-sm bg-gray-50">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <p className="truncate font-medium text-gray-800">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                                <button 
                                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                  className="ml-2 text-red-500 hover:text-red-700 p-1"
                                >
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Botones de acción */}
                      <div className="flex justify-between space-x-4">
                        <button
                          onClick={saveDraft}
                          disabled={files.length === 0 && textResponse.trim() === ''}
                          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                          {draftSaved ? (
                            <>
                              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Guardado
                            </>
                          ) : 'Guardar borrador'}
                        </button>
                        <button
                          onClick={submitAssignment}
                          disabled={isSubmitting || (files.length === 0 && textResponse.trim() === '')}
                          className="flex-1 px-6 py-3 bg-[#CD2E2E] text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enviando...
                            </>
                          ) : 'Entregar tarea'}
                        </button>
                      </div>

                      {/* Advertencia de tiempo */}
                      {timeRemaining > 0 && timeRemaining < 24 * 60 * 60 * 1000 && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 flex items-start">
                          <svg className="flex-shrink-0 h-5 w-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm">
                            Solo te quedan {hoursRemaining} hora(s) para entregar esta tarea
                          </p>
                        </div>
                      )}
                      {timeRemaining <= 0 && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start">
                          <svg className="flex-shrink-0 h-5 w-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="text-sm">
                            El tiempo de entrega ha vencido. Aún puedes enviar, pero podría haber penalización.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssignmentSubmissionView;