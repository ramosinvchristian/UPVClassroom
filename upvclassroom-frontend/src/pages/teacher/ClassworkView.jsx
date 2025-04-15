import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const ClassWorkView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPeopleView = location.pathname.includes('people');
  const isClassworkView = location.pathname.includes('classwork');
  
  // Estado para el contenido de la clase
  const [content, setContent] = useState([
    {
      id: 1,
      type: "tema",
      title: "EVALUACIÓN FINAL",
      description: "",
      isOpen: true,
      items: [
        {
          id: 101,
          type: "tarea",
          title: "Examen teórico",
          description: "Responder las preguntas conceptuales",
          dueAt: "2023-11-30"
        },
        {
          id: 102,
          type: "tarea",
          title: "Proyecto práctico",
          description: "Implementar los algoritmos estudiados",
          dueAt: "2023-12-05"
        }
      ]
    },
    {
      id: 2,
      type: "tema",
      title: "GRÁFICAS",
      description: "Contenido sobre representaciones gráficas",
      isOpen: true,
      items: [
        {
          id: 201,
          type: "material",
          title: "Gráficas en Excel",
          description: "Guía para crear gráficas en Excel",
          fileType: "pdf"
        },
        {
          id: 202,
          type: "tarea",
          title: "Ejercicios de gráficas",
          description: "Resolver los problemas de la sección 4.2",
          dueAt: "2023-10-15"
        }
      ]
    }
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  // Alternar visibilidad de un tema
  const toggleTema = (temaId) => {
    setContent(content.map(tema => 
      tema.id === temaId 
        ? { ...tema, isOpen: !tema.isOpen } 
        : tema
    ));
  };

  // Navegar a las vistas de creación
  const navigateToCreateTema = () => {
    navigate("/teacher/create-theme");
    setShowCreateMenu(false);
  };

  const navigateToCreateTarea = () => {
    navigate("/teacher/create-homework");
    setShowCreateMenu(false);
  };

  const navigateToCreateMaterial = () => {
    navigate("/teacher/create-material");
    setShowCreateMenu(false);
  };

  // Seleccionar un elemento
  const selectItem = (item) => {
    setSelectedItem(item.id === selectedItem?.id ? null : item);
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
                !isPeopleView && !isClassworkView
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

            {/* Contenido Principal */}
            <div className="max-w-6xl mx-auto p-6">
              {/* Botón de Crear con Menú Desplegable */}
              <div className="relative mb-6">
                <button
                  onClick={() => setShowCreateMenu(!showCreateMenu)}
                  className="flex items-center px-4 py-2 bg-[#CD2E2E] text-white rounded-md hover:bg-red-700"
                >
                  <span>Crear</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCreateMenu && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <button
                        onClick={navigateToCreateTema}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Nuevo Tema
                      </button>
                      <button
                        onClick={navigateToCreateTarea}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Nueva Tarea
                      </button>
                      <button
                        onClick={navigateToCreateMaterial}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Nuevo Material
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de Contenido */}
              <div className="space-y-4">
                {content.map(tema => (
                  
                  <div key={tema.id} className="bg-white rounded-lg overflow-hidden shadow border">
                    {/* Encabezado del Tema */}
                    
                    <div 
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedItem?.id === tema.id ? 'bg-red-50 border-l-4 border-red-500' : ''}`}
                      onClick={() => toggleTema(tema.id)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{tema.title}</h3>
                        <svg 
                          className={`w-5 h-5 transform ${tema.isOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {tema.description && <p className="text-gray-600 mt-1">{tema.description}</p>}
                    </div>

                    {/* Contenido del Tema */}
                    {tema.isOpen && (
                      <div className="border-t">
                        {tema.items.map(item => (

                          <Link 
                          to="/teacher/assignment" 
                          key={item.id}
                          className={`block p-4 border-b last:border-b-0 hover:bg-gray-50 ${selectedItem?.id === item.id ? 'bg-red-50' : ''}`}
                          >

                          <div 
                            key={item.id}
                            className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${selectedItem?.id === item.id ? 'bg-red-50' : ''}`}
                            onClick={() => selectItem(item)}
                          >
                            <div className="flex justify-between items-start">
                              {/* Contenido izquierdo */}
                              <div className="flex-1 flex items-start">
                                {/* Icono según tipo */}
                                <div className="mr-3 mt-1">
                                  {item.type === "tarea" ? (
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  ) : (
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                </div>
                                
                                <div>
                                  <h4 className="font-medium">{item.title}</h4>
                                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                </div>
                              </div>
                              
                              {/* Fecha a la derecha (solo para tareas) */}
                              {item.type === "tarea" && item.dueAt && (
                                <div className="ml-4 text-right">
                                  <span className="text-sm text-gray-500 whitespace-nowrap">
                                    {new Date(item.dueAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                          </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>


                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClassWorkView;