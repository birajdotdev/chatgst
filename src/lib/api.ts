import { env } from "@/env";

interface ApiOptions extends RequestInit {
  token?: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: { detail?: string } = {};
    try {
      errorData = await response.json();
    } catch {
      // Response might not be JSON
    }
    throw new ApiError(
      errorData.detail || `Request failed with status ${response.status}`,
      response.status,
      errorData
    );
  }
  return response.json();
}

export const api = {
  get: async <T>(endpoint: string, options?: ApiOptions): Promise<T> => {
    const { token, ...fetchOptions } = options || {};
    const response = await fetch(`${env.API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  post: async <T>(
    endpoint: string,
    data?: unknown,
    options?: ApiOptions
  ): Promise<T> => {
    const { token, ...fetchOptions } = options || {};
    const response = await fetch(`${env.API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  put: async <T>(
    endpoint: string,
    data?: unknown,
    options?: ApiOptions
  ): Promise<T> => {
    const { token, ...fetchOptions } = options || {};
    const response = await fetch(`${env.API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string, options?: ApiOptions): Promise<T> => {
    const { token, ...fetchOptions } = options || {};
    const response = await fetch(`${env.API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },

  // For multipart form data (file uploads)
  upload: async <T>(
    endpoint: string,
    formData: FormData,
    options?: ApiOptions
  ): Promise<T> => {
    const { token, ...fetchOptions } = options || {};
    const response = await fetch(`${env.API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
      },
      body: formData,
      ...fetchOptions,
    });
    return handleResponse<T>(response);
  },
};

export { ApiError };
