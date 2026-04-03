import { createModule } from "../../core/createModule"
import FtthPage from "./FtthPage"

export default createModule({
    name: "Ftth Module",
    menu: {
        label: "FTTH",
        path: "/ftth",
        icon: "⚡",
        order: 4
    },
    routes:[
        {
            path: "/ftth",
            element: <FtthPage />

        }
    ]
})