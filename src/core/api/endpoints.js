import { apiManager } from "./apiManager";

apiManager.register("getUsers", {
  url: "/api/users",
  method: "GET"
});

apiManager.register("createUser", {
  url: "/api/users",
  method: "POST"
});

apiManager.register("getFtthNetwork", {
  url: "/api/ftth/network",
  method: "GET"
});

apiManager.register("saveFtthNetwork", {
  url: "/api/ftth/network",
  method: "POST"
});

apiManager.register("updateFtthNetwork", {
  url: "/api/ftth/network",
  method: "PUT"
});

apiManager.register("get",{
    url:"/todos",
    method:"GET"
});
