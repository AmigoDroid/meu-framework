import { useRoutes } from "react-router-dom";
export function buildRoutes(modules){
    let routes = [];
    modules.forEach((m) => {
        routes.push(...m.routes);
    });
    return useRoutes(routes);
}