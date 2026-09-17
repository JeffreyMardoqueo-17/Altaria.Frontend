const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    throw new Error(errorData.message || `Error en la petición: ${response.status}`);
  }

  // respuestas sin contenido (204 No Content)
  if (response.status === 204) 
    return {} as T;
  
  return response.json();
}