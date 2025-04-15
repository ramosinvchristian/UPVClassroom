import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";

const TeacherClassView = () => {
  // Datos estáticos de ejemplo
  const classInfo = {
    name: "Matemáticas Avanzadas",
    section: "Grupo A - 2023",
    code: "abc-xyz-123",
    teacher: "Prof. Juan Pérez",
    schedule: "Lunes y Miércoles, 10:00 - 12:00"
  };

  const [activeTab, setActiveTab] = useState('muro');
  const location = useLocation();
  const isPeopleView = location.pathname.includes('people-class');
  
  // Estado para el formulario de nuevo aviso
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    attachments: []
  });
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  // Anuncios estáticos (ahora con estado para poder agregar nuevos)
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Proyecto Final - Entrega 1",
      content: "El examen será el próximo viernes. Estudien los capítulos 1 al 3.",
      date: "5 Sep 2023",
      author: "Luis Roberto Flores",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      attachments: []
    }
  ]);

  // Tareas estáticas
  const assignments = [
    {
      id: 1,
      title: "Tarea 3 - Derivadas",
      dueDate: "10 Sep 2023",
      points: 100
    }
  ];

  // Manejar cambios en el formulario de aviso
  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar subida de archivos
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo (solo imágenes o PDF)
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, sube solo imágenes (JPEG, PNG, GIF) o archivos PDF');
      return;
    }

    // Crear vista previa si es imagen
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachmentPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAttachmentPreview(null);
    }

    // Agregar archivo al estado
    setNewAnnouncement(prev => ({
      ...prev,
      attachments: [...prev.attachments, file]
    }));
  };

  // Eliminar archivo adjunto
  const removeAttachment = (index) => {
    const updatedAttachments = [...newAnnouncement.attachments];
    updatedAttachments.splice(index, 1);
    setNewAnnouncement(prev => ({
      ...prev,
      attachments: updatedAttachments
    }));
    setAttachmentPreview(null);
  };

  // Enviar nuevo aviso
  const submitAnnouncement = (e) => {
    e.preventDefault();
    
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert('Por favor, completa el título y el contenido del aviso');
      return;
    }

    const newAnnouncementObj = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }),
      author: "Prof. Juan Pérez",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      attachments: [...newAnnouncement.attachments]
    };

    setAnnouncements([newAnnouncementObj, ...announcements]);
    setNewAnnouncement({ title: '', content: '', attachments: [] });
    setAttachmentPreview(null);
    setIsCreatingAnnouncement(false);
  };

  return (
    <Layout> 
      {/* Pestañas */}
      <div className="pl-[230px]">
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto flex space-x-8">
            <button
              onClick={() => setActiveTab('muro')}
              className={`py-4 px-1 border-b-2 font-medium ${
                activeTab === 'muro' && !isPeopleView
                  ? 'border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Muro
            </button>
            
            <Link 
              to="/teacher/classwork" 
              className={`py-4 px-1 border-b-2 font-medium ${
                isPeopleView
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
            {/* Header */}
            <div className="px-16 pt-5 relative">
              <div className="bg-[conic-gradient(at_center,_#CD2E2E,_#8A0A28,_#CD2E2E)] text-white py-32 px-6 rounded-lg relative w-full max-w-6xl mx-auto"> 
                <h1 className="text-3xl font-semibold absolute bottom-12 left-6 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
                  {classInfo.name}
                </h1>
                <p className="text-white absolute bottom-6 left-6 [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
                  {classInfo.section} • {classInfo.teacher}
                </p>
              </div>
            </div>

            {/* Contenido Principal - ORDEN INVERTIDO */}
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Columna izquierda (1/4) - Próximas entregas */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow border w-full md:w-60">
                  <h3 className="font-semibold text-normal mb-4 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                    Próximas Entregas
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                        Fecha de entrega: martes
                      </p>
                      <p className="text-black text-sm mt-1 hover:underline">
                        23:59 — Proyecto Final
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha (3/4) - Anuncios */}
              <div className="md:col-span-3 space-y-6">
                {activeTab === 'muro' && (
                  <>
                    {/* Botón para crear nuevo anuncio */}
                    {!isCreatingAnnouncement && (
                      <div 
                        className="bg-white px-6 py-2 rounded-lg shadow border w-full cursor-pointer hover:bg-gray-50"
                        onClick={() => setIsCreatingAnnouncement(true)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-[conic-gradient(at_center,_#CD2E2E,_#8A0A28,_#CD2E2E)] flex-shrink-0">
                            <img 
                              src="https://randomuser.me/api/portraits/men/32.jpg" 
                              alt="Profesor"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-gray-400 px-0 py-3.5 rounded-lg w-full">
                            <p className="font-normal">Agrega un aviso a tu clase...</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formulario para crear nuevo anuncio */}
                    {isCreatingAnnouncement && (
                      <div className="bg-white px-6 py-4 rounded-lg shadow border w-full">
                        <form onSubmit={submitAnnouncement}>
                          <div className="mb-4">
                            <input
                              type="text"
                              name="title"
                              placeholder="Título del aviso"
                              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                              value={newAnnouncement.title}
                              onChange={handleAnnouncementChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <textarea
                              name="content"
                              placeholder="Contenido del aviso"
                              rows="4"
                              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                              value={newAnnouncement.content}
                              onChange={handleAnnouncementChange}
                              required
                            ></textarea>
                          </div>
                          
                          {/* Adjuntos */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Adjuntar archivo (imagen o PDF)
                            </label>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleFileUpload}
                              className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-red-50 file:text-red-700
                                hover:file:bg-red-100"
                            />
                            
                            {/* Vista previa de adjuntos */}
                            {attachmentPreview && (
                              <div className="mt-2 relative">
                                <img 
                                  src={attachmentPreview} 
                                  alt="Vista previa" 
                                  className="h-32 object-contain border rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(0)}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                  ×
                                </button>
                              </div>
                            )}
                            
                            {newAnnouncement.attachments.length > 0 && !attachmentPreview && (
                              <div className="mt-2 flex items-center">
                                <span className="text-sm text-gray-600 mr-2">
                                  Archivo adjunto: {newAnnouncement.attachments[0].name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(0)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ×
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingAnnouncement(false);
                                setNewAnnouncement({ title: '', content: '', attachments: [] });
                                setAttachmentPreview(null);
                              }}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Publicar aviso
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Anuncios existentes */}
                      {announcements.map((item) => (
                        <Link 
                          to="/teacher/assignment" 
                          key={item.id} 
                          className="block bg-white px-6 py-3 rounded-lg shadow border w-full hover:bg-gray-50 hover:border-red-200 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-red-700 flex-shrink-0 text-white font-semibold">
                              <img 
                                src={item.authorImage} 
                                alt={item.author}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-500 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                                {item.author} • {item.date}
                              </p>
                              <h3 className="font-semibold text-base mt-1 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                                {item.title}
                              </h3>
                              <p className="text-gray-700 text-sm mt-2">{item.content}</p>
                              
                              {/* Mostrar adjuntos si existen */}
                              {item.attachments.length > 0 && (
                                <div className="mt-3">
                                  {item.attachments[0].type?.startsWith('image/') ? (
                                    <img 
                                      src={URL.createObjectURL(item.attachments[0])} 
                                      alt="Adjunto" 
                                      className="max-h-64 max-w-full rounded border"
                                    />
                                  ) : (
                                    <div 
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-block"
                                    >
                                      <a 
                                        href={URL.createObjectURL(item.attachments[0])} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                      >
                                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Ver archivo adjunto
                                      </a>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </>
                )}

                {activeTab === 'trabajos' && (
                  <>
                    {assignments.map((task) => (
                      <div key={task.id} className="bg-white px-6 py-4 rounded-lg shadow border w-full">
                        <h3 className="font-semibold text-lg [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                          {task.title}
                        </h3>
                        <p className="text-gray-500">Fecha límite: {task.dueDate}</p>
                        <p className="mt-2 text-sm italic">
                          (En una versión real verías las entregas de estudiantes aquí)
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TeacherClassView;