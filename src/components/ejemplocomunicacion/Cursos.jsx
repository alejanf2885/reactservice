import { useEffect, useRef, useState } from "react";
import Global from "../../Global";
import axios from "axios";
import Alumnos from "./Alumnos";

export default function Cursos() {
  const url = Global.urlAlumnos;

  const [cursos, setCursos] = useState([]);
  const [year, setYear] = useState(0);
  const [detallesAlumnos, setDetalles] = useState(null);

  const yearSelectRef = useRef();

  const loadCursos = () => {
    let request = "api/Alumnos/Cursos";

    axios.get(url + request).then((response) => {
      console.log(response.data);
      setCursos(response.data);
    });
  };

  const detalles = (idAlumno) => {
    let request = "api/Alumnos/FindAlumno/" + idAlumno;
    axios.get(url + request).then((response) => {
      setDetalles(response.data);
    });
  };

  const searchByAge = (event) => {
    event.preventDefault();

    let year = yearSelectRef.current.value;
    setYear(year);
  };

  useEffect(() => {
    loadCursos();
  }, []);

  return (
    <div>
      <h1>Lista de cursos y Alumnos</h1>
      <div className="details">
        
        {detallesAlumnos && (
          <div
            className="details"
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h2>
              {detallesAlumnos.nombre} {detallesAlumnos.apellidos}
            </h2>
            <img
              src={detallesAlumnos.imagen}
              alt={`${detallesAlumnos.nombre} ${detallesAlumnos.apellidos}`}
              style={{ width: "150px", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>
      <form action="">
        <select name="" id="" ref={yearSelectRef}>
          {cursos &&
            cursos.map((curso, i) => (
              <option key={i} value={curso}>
                {curso}
              </option>
            ))}
        </select>
        <button onClick={searchByAge}>Buscar por curso</button>
      </form>

      <Alumnos detalles={detalles} year={year} />
    </div>
  );
}
