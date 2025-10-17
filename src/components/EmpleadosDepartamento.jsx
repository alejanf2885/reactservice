import axios from "axios";
import Global from "../Global";
import { useRef, useState } from "react";
import './EmpleadosDepartamento.css';

export default function EmpleadosDepartamento() {
  const url = Global.urlEmpleados;
  const idRef = useRef();

  const [empleados, setEmpleados] = useState([]);

  const searchEmpleados = (e) => {
    e.preventDefault();
    
    let id = idRef.current.value;
    let request = 'api/Empleados/EmpleadosDepartamento/'+id
    console.log(url+request)
    axios.get(url+request).then((response)=> {
        console.log(response.data)
        setEmpleados(response.data)
    })
  };

  return (
    <div className="empleados-departamento-container">
      <div className="header">
        <h1 className="title">Departamentos</h1>
        <p className="subtitle">Buscar empleados por Departamento</p>
      </div>
      
      <form onSubmit={searchEmpleados} className="search-form">
        <div className="form-group">
          <label htmlFor="departamento-id" className="form-label">ID Departamento</label>
          <div className="input-button-group">
            <input 
              id="departamento-id"
              type="number" 
              ref={idRef}
              className="form-input"
              placeholder="Ingrese el ID del departamento"
              required
            />
            <button type="submit" className="btn-search">
              <span>🔍</span> Buscar
            </button>
          </div>
        </div>
      </form>
      
      <div className="empleados-list">
        {empleados.length <= 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📋</p>
            <h3>No hay empleados</h3>
            <p>Seleccione un departamento para ver sus empleados</p>
          </div>
        ) : (
          <div className="empleados-grid">
            {empleados.map((empleado, i) => (
              <div key={empleado.idEmpleado} className="empleado-card">
                <div className="empleado-header">
                  <span className="empleado-id">#{empleado.idEmpleado}</span>
                </div>
                <div className="empleado-body">
                  <h3 className="empleado-nombre">{empleado.apellido}</h3>
                  <div className="empleado-info">
                    <div className="info-item">
                      <span className="info-label">Oficio:</span>
                      <span className="info-value">{empleado.oficio}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Salario:</span>
                      <span className="info-value salary">{empleado.salario.toLocaleString('es-ES')} €</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
