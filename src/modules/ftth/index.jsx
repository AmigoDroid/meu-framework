import { createModule } from "../../core/modules/createModule";
import { Navigate } from "react-router-dom";
import FtthRoute from "./FtthRoute";

export default createModule({
    name: "Visão da Rede",
    menu: {
        label: "Visão da Rede",
        path: "/ftth",
        icon: "🌐",
        order: 4
    },
    routes:[
        {
            path: "/visao-da-rede",
            element: <Navigate to="/ftth" replace />
        },
        {
            path: "/ftth",
            element: <FtthRoute />
        }
    ]
})
