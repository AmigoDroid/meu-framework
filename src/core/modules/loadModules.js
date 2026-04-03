export function loadModules() {
    const modulesFiles = import.meta.glob("../../modules/**/index.jsx",{
        eager:true
    });
    const modules = [];
    for (const path in modulesFiles){
        modules.push(modulesFiles[path])
    }
    return modules;
} 