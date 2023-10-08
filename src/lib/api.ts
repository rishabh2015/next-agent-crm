// const BASE_URL = 'http://192.168.1.45:8080';
// const BASE_URL = 'http://127.0.0.1:8080';

import DataStore from "./data-store";
import { Contact, ContactCreationRequest, Permission, Role, User, UserCreationRequest } from "./entities.types";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = 'http://192.168.1.141:8080';
const BASE_URL = '/mock';

// const http: typeof fetch = (input, init) => fetch(BASE_URL + input, init)

const request = async <T extends any>(method: string = 'get', url: string, init: RequestInit = {}) => {
  console.log(`=> ${method.toUpperCase()} ${url}`);

  // const headers: Record<string, string> = { 'Content-Type': 'application/json', ...init.headers }
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (!url.startsWith('/onboarding')) {
    const token = DataStore.getToken();
    headers['Authorization'] = `Bearer ${token}`;
  }
  const body = init.body !== undefined ? JSON.stringify(init.body) : undefined;

  const response = await fetch(BASE_URL + url, { ...init, method, body, headers });
  let json = undefined;
  try { json = await response.json(); } catch (e) { }
  console.log(`<= ${method.toUpperCase()} ${url} :: ${response.status} ${JSON.stringify(json)}`)

  return {
    ok: response.ok,
    body: json as T,
    status: response.status,
    headers: response.headers,
  };
};

/**
 * "RequestInit" has a body type `BodyInit | null` which expects stringified json.
 * Hence extending it to accept body of any type so that it can be stringified later
 */
interface ExtendedRequestInit extends RequestInit {
  body: any;
};

const http = {
  get: <T extends any>(url: string, init?: ExtendedRequestInit) => request<T>('get', url, init),
  post: <T extends any>(url: string, init?: ExtendedRequestInit) => request<T>('post', url, init),
  put: <T extends any>(url: string, init?: ExtendedRequestInit) => request<T>('put', url, init),
  patch: <T extends any>(url: string, init?: ExtendedRequestInit) => request<T>('patch', url, init),
  delete: <T extends any>(url: string, init?: ExtendedRequestInit) => request<T>('delete', url, init),
};

interface BaseResponse {
  message?: string;
  error?: string;
}

interface SignupVerifyResponse extends BaseResponse {
  verificationToken?: string
}

export const Api = {
  // Onboarding

  initiateSignup: (email: string) => http.post<any>('/onboarding/initiate', { body: { email } }),

  verifySignup: (email: string, code: string) => http.post<SignupVerifyResponse>('/onboarding/verify', { body: { email, code } }),

  completeSignup: (body: any) => http.post<any>('/onboarding/create', { body }),

  // Contacts

  listContacts: () => http.get<Array<Contact>>('/contacts'),

  createContact: (body: ContactCreationRequest) => http.post<Contact>('/contacts', { body }),

  updateContact: (id: string, body: ContactCreationRequest) => http.put<Contact>('/contacts/' + id, { body }),

  deleteContact: (id: string) => http.delete<void>('/contacts/' + id),

  // User - Agent

  listAgents: () => http.get<Array<User>>('/emp/agent'),

  createAgent: (body: UserCreationRequest) => http.post<User>('/emp/agent', { body }),

  updateAgent: (id: string, body: UserCreationRequest) => http.put<User>('/emp/agent/' + id, { body }),

  deleteAgent: (id: string) => http.delete<void>('/emp/agent/' + id),

  // User - Employee

  listEmployees: () => http.get<Array<User>>('/emp/agent'),

  createEmployee: (body: UserCreationRequest) => http.post<User>('/emp/agent', { body }),

  updateEmployee: (id: string, body: UserCreationRequest) => http.put<User>('/emp/agent/' + id, { body }),

  deleteEmployee: (id: string) => http.delete<void>('/emp/agent/' + id),

  // IAM - Roles & Permissions

  getPermissions: () => http.get<Permission[]>('/access/permissions'),

  getRoles: () => http.get<Role[]>('/access/roles'),

  putRoles: (body: Role[]) => http.put('/access/roles', { body }),
}