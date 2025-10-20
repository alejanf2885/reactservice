import { useEffect, useState } from "react";
import Global from "../../Global";
import axios from "axios";

export default function Alumnos(props) {
  const url = Global.urlAlumnos;

  const [alumnos, setAlumnos] = useState([]);

  const searchByYear = () => {
    let request = "api/Alumnos/FiltrarCurso/" + props.year;
   

    axios.get(url + request).then((response) => {
      setAlumnos(response.data);
     
    });
    
  };

  useEffect(() => {
    searchByYear();
  }, [props.year]);

  return (
    <div>
      <h1>Alumnos: </h1>
      {alumnos && alumnos.length > 0 ? (
        alumnos.map((alumno, i) => (
          <div key={i}>
            <h1>
              {alumno.nombre} {alumno.apellidos}
            </h1>
            <button onClick={() => props.detalles(alumno.idAlumno)}>Detalles</button>
          </div>
        ))
      ) : (
        <h1>No hay</h1>
      )}
    </div>
  );
}
