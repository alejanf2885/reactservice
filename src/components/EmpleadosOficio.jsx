import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Global from "../Global";
import "./EmpleadosDepartamento.css";

export default function EmpleadosOficio() {
  const urlEmpleados = Global.urlEmpleados;
  const selectOficioRef = useRef();
  const [oficios, setOficios] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    loadEmpleos();
  }, []);

  const loadEmpleos = () => {
    let request = "api/Empleados";
    let empleosTodos = [];
    axios.get(urlEmpleados + request).then((response) => {
      response.data.forEach((e) => {
        empleosTodos.push(e.oficio);
      });
      const empleosUnicos = [...new Set(empleosTodos)];
      setOficios(empleosUnicos);
    });
  };

  const searchEmpleados = () => {
    let oficio = selectOficioRef.current.value;
    let request = "api/Empleados/EmpleadosOficio/" + oficio;
    axios.get(urlEmpleados + request).then((response) => {
      setEmpleados(response.data);
    });
  };

  return (
    <div className="empleados-departamento-container">
      <div className="header">
        <h1 className="title">Empleados</h1>
        <p className="subtitle">Buscar empleados por oficio</p>
      </div>
      <div className="form-group">
        <label htmlFor="oficio-select" className="form-label">
          Oficio
        </label>
        <div className="input-button-group">
          <select
            id="oficio-select"
            ref={selectOficioRef}
            onChange={searchEmpleados}
            className="custom-select"
          >
            {oficios.length > 0 ? (
              oficios.map((oficio, i) => (
                <option key={i} value={oficio}>
                  {oficio}
                </option>
              ))
            ) : (
              <option value="">Sin oficios</option>
            )}
          </select>
        </div>
      </div>
      <div className="empleados-list">
        {empleados.length > 0 ? (
          <div className="table-responsive">
            <table className="empleados-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Apellido</th>
                  <th>Oficio</th>
                  <th>Salario</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado, i) => (
                  <tr key={i}>
                    <td><span className="empleado-id-table">#{empleado.idEmpleado}</span></td>
                    <td className="empleado-nombre-table">{empleado.apellido}</td>
                    <td>{empleado.oficio}</td>
                    <td className="empleado-salario-table">{empleado.salario.toLocaleString("es-ES")} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-icon">📋</p>
            <h3>No hay empleados</h3>
            <p>Seleccione un oficio para ver sus empleados</p>
          </div>
        )}
      </div>
    </div>
  );
}
