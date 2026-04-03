import { createModule } from "../../core/modules/createModule";
import ClientesPage from "./ClientesPage";

export default createModule({
    name:"Clientes",
     menu: {
    label: "Clientes",
    path: "/clientes",
    icon: "👥",
    order: 2
  },
    routes:[
        {
            path:"/clientes",
            element: <ClientesPage/>
        }
    ]
})