import { useParams } from "react-router-dom";

function TablaMultiplicar() {
  const { numero } = useParams(); // aquí capturamos el parámetro
  const num = Number(numero);     // convertimos a número si es necesario

  return (
    <div>
      <h2>Tabla de multiplicar del {num}</h2>
      <ul>
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i}>{num} x {i + 1} = {num * (i + 1)}</li>
        ))}
      </ul>
    </div>
  );
}

export default TablaMultiplicar;
