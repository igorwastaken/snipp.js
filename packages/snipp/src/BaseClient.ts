export interface BaseClientOptions {
  baseURL: string;
  apiKey?: string;
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, any>;
  body?: any;
}

export class BaseClient {
  private baseURL: string;
  private apiKey?: string;
  private defaultHeaders: Record<string, string>;

  constructor(options: BaseClientOptions) {
    this.baseURL = options.baseURL;
    this.apiKey = options.apiKey;
    this.defaultHeaders = options.defaultHeaders || {};
  }

  private buildQueryString(params?: Record<string, any>): string {
    if (!params) return "";
    const query = new URLSearchParams();
    for (const key in params) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    }
    const queryString = query.toString();
    return queryString ? `?${queryString}` : "";
  }

  private async request<T>(
    method: string,
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}${this.buildQueryString(options.query)}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...this.defaultHeaders,
      ...options.headers,
    };

    if (this.apiKey) {
      headers["api-key"] = `${this.apiKey}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    return response.json();
  }

  protected get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>("GET", endpoint, options);
  }

  protected async post<T>(
    path: string,
    options?: RequestInit & { baseURL?: string },
  ): Promise<T> {
    const url = `${options?.baseURL || this.baseURL}${path}`;
    const res = await fetch(url, {
      ...options,
      method: "POST",
      headers: {
        "api-key": `${this.apiKey}`,
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
  }

  protected put<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>("PUT", endpoint, options);
  }

  protected delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>("DELETE", endpoint, options);
  }
}
