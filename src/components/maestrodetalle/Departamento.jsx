import { useEffect, useRef, useState } from "react";
import Empleados from "./Empleados";
import Global from "../../Global";
import axios from "axios";

export default function Departamento() {
  const selectDepartRef = useRef();

  const [departamentos, setDepartamentos] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState(0);

  const urlDepartamentos = Global.urlDepartamentos;

  const loadDepartamentos = () => {
    let request = "webresources/departamentos";

    axios.get(urlDepartamentos + request).then((response) => {
      console.log(response);
      setDepartamentos(response.data);
    });
  };

  const searchEmpleados = (event) => {
    event.preventDefault();

    let idDepartamento = selectDepartRef.current.value;
    setIdDepartamento(idDepartamento);
  };

  useEffect(() => {
    loadDepartamentos();
  }, []);

  return (
    <div>
      <h2>Departamentos</h2>

      <form>
        <select name="" id="" ref={selectDepartRef}>
          {departamentos.length >= 0 ? (
            departamentos.map((departamento, i) => (
              <option key={i} value={departamento.numero}>
                {departamento.nombre}
              </option>
            ))
          ) : (
            <option></option>
          )}
        </select>
        <button onClick={searchEmpleados}>Buscar Empleados</button>
      </form>

      {idDepartamento != 0 && <Empleados idDepartamento={idDepartamento} />}
    </div>
  );
}
