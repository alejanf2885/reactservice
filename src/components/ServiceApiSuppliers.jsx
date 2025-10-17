import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Global from "../Global";

export default function ServiceApiSuppliers() {
  const url = Global.urlNorthwind;

  const [suppliers, setSuppliers] = useState([]);
  const [detail, setDetails] = useState(null);
  const idRef = useRef();

  useEffect(() => {
    const request = "suppliers";
    axios.get(url + request).then((response) => {
      console.log("Leyendo");
      setSuppliers(response.data.value);
    });
  }, []);

  const searchID = () => {
    let id = parseInt(idRef.current.value);

    const supplier = suppliers.find((s) => s.SupplierID === id);

    //Otra forma
    //suppliers.forEach((s) => {
    //if (s.SupplierID === id) {
    //  foundSupplier = s;
    //}
    //});

    setDetails(supplier || null);
  };

  return (
    <div>
      <h1>Lista de suppliers</h1>
      <div className="container">
        {detail == null ? (
          <p>No hay detalles</p>
        ) : (
          <div>
            {" "}
            <h1>Detalles</h1>
            <p>ID: {detail.SupplierID}</p>
            <p>Contact name: {detail.ContactName}</p>
            <p>Contact Title: {detail.ContactTitle}</p>
            <p>City: {detail.City}</p>
            <p>Phone: {detail.Phone}</p>
          </div>
        )}
      </div>

      <form action={searchID}>
        <input type="text" ref={idRef} />
        <button>Buscar</button>
      </form>
      <div className="">
        {suppliers.map((supplier, i) => (
          <div key={i}>
            <h2>{supplier.SupplierID}</h2>
            <h2>{supplier.ContactName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
