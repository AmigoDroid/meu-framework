import { apiManager } from "./apiManager";

apiManager.register("getUsers", {
  url: "/api/users",
  method: "GET"
});

apiManager.register("createUser", {
  url: "/api/users",
  method: "POST"
});
apiManager.register("get",{
    url:"/todos",
    method:"GET"
});