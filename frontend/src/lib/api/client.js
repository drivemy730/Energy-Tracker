const API_BASE = "http://localhost:8082/api/energy";

export async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API GET error");
  }

  return response.json();
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API POST error");
  }

  return response.json();
}
export const api = { get: apiGet, post: apiPost };
