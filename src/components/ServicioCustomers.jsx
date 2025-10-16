import axios from "axios";
import { useEffect } from "react";

const url = "https://services.odata.org/V4/Northwind/Northwind.svc/Customers";

export default function ServicioCustomers() {
    
    const [customers, setCustomers] = useState


    useEffect(()=>{
        loadCustomers();
    },)


  const loadCustomers = () => {
    console.log("Antes del servicio");
    axios.get(url).then((response) => {
      console.log("Leyendo");
      customers = response.data.value;
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
