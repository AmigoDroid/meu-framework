class ApiManager {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "";

    if (!this.baseURL) {
      console.warn("⚠️ API URL não definida no .env");
    }else{ console.log(`🚀 API Base URL: ${this.baseURL}`); }

    this.endpoints = {};
    this.listeners = {
      request: [],
      response: [],
      error: []
    };
  }

  register(name, config) {
    this.endpoints[name] = config;
  }

  async request(name, pathOrData = {}, maybeData = {}) {
  const endpoint = this.endpoints[name];
  if (!endpoint) throw new Error(`Endpoint "${name}" não registrado`);

  let path = "";
  let data = {};

  // Se o segundo argumento for string, é o path extra
  if (typeof pathOrData === "string") {
    path = pathOrData;
    data = maybeData;
  } else {
    data = pathOrData;
  }

  // monta URL final
  const url = (endpoint.baseURL || this.baseURL) + endpoint.url + path;

  this.emit("request", { name, data, url });

  try {
    const res = await fetch(url, {
      method: endpoint.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(endpoint.headers || {})
      },
      body: endpoint.method !== "GET" ? JSON.stringify(data) : undefined
    });

    const json = await res.json();
    this.emit("response", { name, data: json });

    return json;

  } catch (err) {
    this.emit("error", { name, error: err });
    throw err;
  }
}
  on(event, callback) {
    this.listeners[event].push(callback);

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, payload) {
    this.listeners[event].forEach(cb => cb(payload));
  }
}

export const apiManager = new ApiManager();