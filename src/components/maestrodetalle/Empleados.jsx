import { useEffect, useState } from "react";
import Global from "../../Global";
import axios from "axios";
import "./Empleados.css";

export default function Empleados(props) {
  const urlEmpleados = Global.urlEmpleados;

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    loadEmpleados();
  }, [props.idDepartamento]);

  const loadEmpleados = () => {
    let request = "api/Empleados/EmpleadosDepartamento/" + props.idDepartamento;

    axios.get(urlEmpleados + request).then((response) => {
      console.log(response);
      setEmpleados(response.data);
    });
  };


return (
    <div className="empleados-container">
        <div className="empleados-header">
            <h1>Empleados</h1>
            <h4>Id Departamento: {props.idDepartamento}</h4>
        </div>

        {empleados && empleados.length > 0 ? (
            <div className="empleados-grid">
                {empleados.map((empleado, i) => {
                    const key = empleado.idEmpleado ?? empleado.id ?? i;
                    const salario =
                        typeof empleado.salario === "number"
                            ? empleado.salario.toLocaleString("es-ES", { style: "currency", currency: "EUR" })
                            : empleado.salario ?? "—";

                    return (
                        <div key={key} className="empleado-card">
                            <h2 className="empleado-name">{empleado.apellido ?? "Sin apellido"}</h2>
                            <p className="empleado-meta">
                                <strong>Oficio:</strong> {empleado.oficio ?? "—"}
                            </p>
                            <p className="empleado-meta">
                                <strong>Salario:</strong> {salario}
                            </p>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="empleados-empty">
                <h3>No hay empleados</h3>
                <p>No se encontraron registros para este departamento.</p>
            </div>
        )}
    </div>
);
}
