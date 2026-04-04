import { createModule } from "../../core/modules/createModule";
import FtthPage from "./FtthPage"

export default createModule({
    name: "Visão da Rede",
    menu: {
        label: "Visão da Rede",
        path: "/visao-da-rede",
        icon: "🌐",
        order: 4
    },
    routes:[
        {
            path: "/ftth",
            element: <FtthPage />
        }
    ]
})