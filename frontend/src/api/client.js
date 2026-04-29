const API_BASE_URL = "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload.detail || payload.message || "Request failed.";
    throw new Error(message);
  }

  return payload;
}

export function getHealth() {
  return request("/health", { method: "GET" });
}

export function getConfig() {
  return request("/config", { method: "GET" });
}

export function saveConfig(config) {
  return request("/config", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

export function runCode(payload) {
  return request("/run", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function stopCode() {
  return request("/stop", {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export function getCompletions(payload) {
  return request("/completions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
