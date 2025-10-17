import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Global from "../Global";
import "./EmpleadosDepartamento.css";

export default function EmpleadosDepartamentov2() {
  const urlDepartamentos = Global.urlDepartamentos;
  const urlEmpleados = Global.urlEmpleados;

  const idSelectDepRef = useRef();

  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    loadDepartamentos();
  }, []);

  const searchDepartamento = (e) => {
    let id = idSelectDepRef.current.value;
    console.log()
    let request = "api/Empleados/EmpleadosDepartamento/" + id;

    console.log(urlEmpleados+request)
    
    axios.get(urlEmpleados + request).then((response) => {
      console.log(response.data);
      setEmpleados(response.data);
    });
  };

  const loadDepartamentos = () => {
    let request = "webresources/departamentos";

    console.log(urlDepartamentos+request)

    axios.get(urlDepartamentos + request).then((response) => {
        console.log(response)
      setDepartamentos(response.data);
    });
  };

  return (
    <div className="empleados-departamento-container">
      <div className="header">
        <h1 className="title">Departamentos</h1>
        <p className="subtitle">Buscar empleados por Departamento</p>
      </div>

      <div className="form-group">
        <label htmlFor="departamento-id" className="form-label">
          ID Departamento
        </label>
        <div className="input-button-group">
          <select name="" onChange={searchDepartamento} id="" ref={idSelectDepRef}>
            {departamentos.length >= 0 ? (
              departamentos.map((dept, index) => (
                <option key={index} value={dept.numero} >
                  {dept.nombre}
                </option>
              ))
            ) : (
              <option></option>
            )}
          </select>
        </div>
      </div>

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
              
              <div key={i} className="empleado-card">
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
                      <span className="info-value salary">
                        {empleado.salario.toLocaleString("es-ES")} €
                      </span>
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
