import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const HomeView = () => {
  // Datos de ejemplo con 6 clases y tareas variadas
  const [classes] = useState([
    {
      id: 1,
      name: "Tecnologías Web Avanzadas",
      code: "ITI-2024-08",
      teacher: "Luis Roberto Flores",
      teacherImage: "https://randomuser.me/api/portraits/men/32.jpg",
      career: "Ingeniería en Sistemas",
      semester: "8",
      color: "bg-[conic-gradient(at_center,_#CD2E2E,_#8A0A28,_#CD2E2E)]",
      assignments: [] // Sin tareas
    },
    {
      id: 2,
      name: "Inteligencia Artificial",
      code: "IA-2024-06",
      teacher: "María González",
      teacherImage: "https://randomuser.me/api/portraits/women/44.jpg",
      career: "Ingeniería en Sistemas",
      semester: "6",
      color: "bg-[conic-gradient(at_center,_#EDBD3B,_#D06E18,_#EDBD3B)]",
      assignments: [
        {
          title: "Proyecto Final - Entrega",
          day: "lunes",
          hour: "23:59"
        },
        {
          title: "Proyecto en Equipo U2",
          day: "martes",
          hour: "23:59"
        }
      ]
    },
    {
      id: 3,
      name: "Bases de Datos Avanzadas",
      code: "BDA-2024-07",
      teacher: "Carlos Sánchez",
      teacherImage: "https://randomuser.me/api/portraits/men/75.jpg",
      career: "Ingeniería en Sistemas",
      semester: "7",
      color: "bg-[conic-gradient(at_center,_#98C14C,_#36763B,_#98C14C)]",
      assignments: [
        {
          title: "U3 Certificado Curso 6",
          day: "martes",
          hour: "23:59"
        },
        {
          title: "U3 Calificaciones Curso 6: Diseños",
          day: "jueves",
          hour: "23:59"
        }
      ]
    },
    {
      id: 4,
      name: "Seguridad Informática",
      code: "SI-2024-05",
      teacher: "Ana Martínez",
      teacherImage: "https://randomuser.me/api/portraits/women/63.jpg",
      career: "Ingeniería en Sistemas",
      semester: "5",
      color: "bg-[conic-gradient(at_center,_#F45799,_#8C0C1B,_#F45799)]",
      assignments: [
        {
          title: "Examen Parcial",
          day: "viernes",
          hour: "18:00",
          description: "Capítulos 1 al 5"
        }
      ]
    },
    {
      id: 5,
      name: "Programación Móvil",
      code: "PM-2024-06",
      teacher: "Jorge Rodríguez",
      teacherImage: "https://randomuser.me/api/portraits/men/85.jpg",
      career: "Ingeniería en Sistemas",
      semester: "6",
      color: "bg-[conic-gradient(at_center,_#2694B9,_#153F79,_#2694B9)]",
      assignments: [
        {
          title: "Práctica Semanal",
          day: "miércoles",
          hour: "23:59"
        },
        {
          title: "Entrega Final",
          day: "viernes",
          hour: "23:59",
          description: "Incluir documentación"
        }
      ]
    },
    {
      id: 6,
      name: "Cloud Computing",
      code: "CC-2024-07",
      teacher: "Laura Fernández",
      teacherImage: "https://randomuser.me/api/portraits/women/22.jpg",
      career: "Ingeniería en Sistemas",
      semester: "7",
      color: "bg-[conic-gradient(at_center,_#9D4ACE,_#501F6C,_#9D4ACE)]",
      assignments: [
        {
          title: "Laboratorio 3",
          day: "lunes",
          hour: "23:59"
        },
        {
          title: "Laboratorio 4",
          day: "lunes",
          hour: "23:59"
        }
      ]
    }
  ]);

  return (
    <Layout>
      <div className="ml-64 pb-8 min-h-[calc(100vh-4rem)] bg-white">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {/* Espacio reservado para contenido del header si es necesario */}
          </div>
        </div>

        {/* Grid de tarjetas - Solo cambié el gap y max-w para mejor disposición */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl px-6">
          {classes.map(cls => (
            <div key={cls.id} className="relative w-full">
              {/* Cambié solo el to del Link para que vaya a teacher-class */}
              <Link 
                to="/teacher/class" 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-[280px] flex flex-col"
              >
                {/* Área superior con color - Exactamente igual */}
                <div className={`${cls.color} h-28 w-full p-4 flex flex-col justify-between text-white`}>
                  <h2 className="text-xl font-semibold truncate [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] hover:underline">
                    {cls.name}
                  </h2>
                  <div>
                    <p className="text-sm truncate [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">{cls.code}</p>
                    <p className="text-xs truncate [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">{cls.teacher}</p>
                  </div>
                </div>

                {/* Foto de perfil del profesor - Exactamente igual */}
                <div className="absolute right-4 top-[calc(7rem-40px)] z-10">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 shadow-lg">
                    <img 
                      src={cls.teacherImage} 
                      alt={`${cls.teacher}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                </div>

                {/* Área de tareas - Exactamente igual */}
                <div className="mt-6 flex-grow px-4 pb-4">
                  <div className="space-y-1">
                    {cls.assignments.length === 0 ? (
                      <p></p>
                    ) : (
                      Object.entries(
                        cls.assignments.reduce((acc, assignment) => {
                          if (!acc[assignment.day]) acc[assignment.day] = [];
                          acc[assignment.day].push(assignment);
                          return acc;
                        }, {})
                      ).map(([day, tasks], dayIndex) => (
                        <div key={dayIndex} className="hover:bg-gray-50 p-2 rounded transition-colors">
                          <p className="text-[13px] font-medium text-gray-800">
                            Fecha de entrega: {day}
                          </p>
                          {tasks.map((task, taskIndex) => (
                            <p key={taskIndex} className="text-xs font-normal text-gray-600 mt-1">
                              {task.hour} — <span className="font-semibold">{task.title}</span>
                            </p>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomeView;