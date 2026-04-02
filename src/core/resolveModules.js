export async function resolveModules(modulesLoader) {
    const modules = [];
    for (const load of modulesLoader){
       const mod = await load;
       modules.push(mod.default);
    }
    return modules;
}