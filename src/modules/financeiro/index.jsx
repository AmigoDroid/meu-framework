import { createModule } from "../../core/modules/createModule";
import FinanceiroPage from "./FinanceiroPage";

 export default createModule({
    name:"Financeiro",
     menu: {
    label: "Financeiro",
    path: "/financeiro",
    icon: "💰",
    order: 3
  },
    routes:[
        {
        path:"/financeiro",
        element:<FinanceiroPage />
        }
    ]
});