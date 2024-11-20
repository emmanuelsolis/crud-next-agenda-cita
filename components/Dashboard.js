import { useState, useEffect } from 'react';

    const Dashboard = () => {
      const [appointments, setAppointments] = useState([]);
      const [selectedDate, setSelectedDate] = useState(null);
      const [selectedTime, setSelectedTime] = useState(null);
      const [userName, setUserName] = useState('');
      const [appointmentReason, setAppointmentReason] = useState('');
      const [showModal, setShowModal] = useState(false);

      useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
      }, []);

      const saveAppointments = (appointments) => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
        setAppointments(appointments);
      };

      const addAppointment = () => {
        if (selectedDate && selectedTime && userName && appointmentReason) {
          const newAppointment = {
            id: Date.now(),
            date: selectedDate,
            time: selectedTime,
            name: userName,
            reason: appointmentReason
          };
          saveAppointments([...appointments, newAppointment]);
          setSelectedDate(null);
          setSelectedTime(null);
          setUserName('');
          setAppointmentReason('');
          setShowModal(false);
        }
      };

      const deleteAppointment = (id) => {
        const filteredAppointments = appointments.filter(app => app.id !== id);
        saveAppointments(filteredAppointments);
      };

      const hours = Array.from({ length: 9 }, (_, i) => `${8 + i}:00`);

      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Panel de Citas</h1>
          <button onClick={() => setShowModal(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Reservar Cita</button>
          <ul>
            {appointments.map(app => (
              <li key={app.id} className="mb-2 p-2 bg-white rounded shadow">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl">{app.date} a las {app.time}</h2>
                    <p><strong>Nombre:</strong> {app.name}</p>
                    <p><strong>Motivo:</strong> {app.reason}</p>
                  </div>
                  <div>
                    <button onClick={() => deleteAppointment(app.id)} className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl mb-2">Reservar Nueva Cita</h2>
                <input
                  type="text"
                  placeholder="Tu Nombre"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mb-2 p-2 border rounded w-full"
                />
                <textarea
                  placeholder="Motivo de la Cita"
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="date"
                  value={selectedDate || ''}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mb-2 p-2 border rounded w-full"
                />
                {selectedDate && (
                  <>
                    <h2 className="text-xl mb-2">Selecciona una Hora</h2>
                    <ul>
                      {hours.map(hour => (
                        <li key={hour}>
                          <button
                            onClick={() => setSelectedTime(hour)}
                            className={`mb-1 px-4 py-2 rounded ${selectedTime === hour ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                          >
                            {hour}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <div className="mt-4">
                  <button onClick={addAppointment} className="px-4 py-2 bg-green-500 text-white rounded">Guardar</button>
                  <button onClick={() => setShowModal(false)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    export default Dashboard;
