
export function resolveTitle(modules){
  //const route = modules.flatMap(m => m.routes).find(r => r.path === window.location.pathname);
  const name = modules.find(m => m.routes.some(r => r.path === window.location.pathname))?.name;
  //console.log(route);
  
  return  name? name : "GMF DOC";
}