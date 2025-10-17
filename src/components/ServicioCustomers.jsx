import axios from "axios";
import { useEffect, useState } from "react";
import Global from "../Global";

const url = Global.urlNorthwind;

export default function ServicioCustomers() {
    
const [customers, setCustomers] = useState([]);




    useEffect(()=>{
        loadCustomers();
    },)


  const loadCustomers = () => {
    let request = 'Customers'
    console.log("Antes del servicio");
    axios.get(url+request).then((response) => {
      console.log("Leyendo");
      setCustomers(response.data.value)
      console.log(customers);
    });
    console.log("Despues del servicio");
  };

  return (
    <div>
      <h1>Servicio Api customers</h1>
      <button>Load Customers</button>

      <div className="contaienr">
        {customers.map((cliente,i)=> (
            <h3>{cliente.ContactName}</h3>
        ))}
      </div>
    </div>
  );
}
