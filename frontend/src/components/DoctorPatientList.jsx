import React, { useEffect, useState } from 'react';
import apiClient from '../axios';
import ObjectToTable from './objectTotable';


function DoctorPatientList() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const doctorRes = await apiClient.get('/doctorsPatients/doctors')//fetchDoctors();
        const patientRes = await apiClient.get('/doctorsPatients/patients')//fetchPatients();
        setDoctors(doctorRes.data);
        setPatients(patientRes.data);
      } catch (err) {
        console.error('Error loading doctor/patient lists:', err);
      }
    };
    loadData();
  }, []);

  const handleFetchDoctorById = async () => {
    try {
      const res = await apiClient.get(`/doctorsPatients/doctors/${doctorId}`)//fetchDoctorById(doctorId);
      setSelectedDoctor(res.data);
    } catch (err) {
      console.error('Error fetching doctor by ID:', err);
    }
  };

  const handleFetchPatientById = async () => {
    try {
      const res = await apiClient.get(`/doctorsPatients/patients/${patientId}`)//fetchPatientById(patientId);
      setSelectedPatient(res.data);
    } catch (err) {
      console.error('Error fetching patient by ID:', err);
    }
  };

  return (
    <div className="container">
        <div>
          <h2>Doctors List</h2><br />
          <ul className="user-list">
          {doctors.map((doc) => (
          <li key={doc._id} className="user-item">
          <span className="bullet">•</span>
          <span className="user-info">
         <strong>{doc.username}</strong> - {doc.specialization} - ID: {doc._id}
          </span>
          </li>
           ))}
        </ul>

          <br />
 
          <div>
            <h3 >Fetch Doctor by ID</h3><br />
            <input
              type="text"
              placeholder="Enter Doctor ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="border p-2 mr-2 mt-2 w-full md:w-auto"
            />
            <button
              onClick={handleFetchDoctorById}
              className="button"
            >
              Fetch
            </button>
            {selectedDoctor && (
              <>
            <h4 className="mt-4 font-semibold">Doctor Details:</h4>
              <ObjectToTable data={selectedDoctor} />
              </>
            )}
          </div>
        </div>

        {/* Patients Section */}
        <div>
        <br />
          <h2 >Patients List</h2><br />
          <ul className="user-list">
           {patients.map((pat) => (
            <li key={pat._id} className="user-item">
           <span className="bullet">•</span>
           <span className="user-info">
           <strong>{pat.username}</strong> - Age: {pat.age} - ID: {pat._id}
           </span>
            </li>
            ))}
          </ul>
        <br />

          <div>
            <h3 className="font-semibold">Fetch Patient by ID</h3><br />
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="border p-2 mr-2 mt-2 w-full md:w-auto"
            />
            <button
              onClick={handleFetchPatientById}
              className="button"
            >
              Fetch
            </button>
            {selectedPatient && (
             <>
             <h4 className="mt-4 font-semibold">Patient Details:</h4>
             <ObjectToTable data={selectedPatient} />
             </>
             )}
          </div>
        </div>
    </div>
  );
}

export default DoctorPatientList;
