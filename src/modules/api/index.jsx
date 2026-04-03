import { createModule } from "../../core/modules/createModule";
import ApiPage from "./ApiPage";

export default createModule({
    name:"Gerenciador de API",
    menu:{
        label:"API",
        icon:"🔌",
        order:96,
        path:"/manager/api"
    },
    routes:[
        {
            path:"/manager/api",
            element: <ApiPage/>
        }
    ]
})