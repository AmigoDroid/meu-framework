export function createApp(){
    const app = {
         routes:[],
         menus:[],
         use(plugin){
            if(plugin.install){
                plugin.install(this);
            }
        },
        addRoutes(route){
            this.routes.push(route);
        },
        addMenu(menu){
            this.menus.push(menu);
        }
    };
    return app;
}