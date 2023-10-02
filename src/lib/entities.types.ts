export interface User {
  id: string;
  customId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneCode?: string;
  phoneNo?: string;
}

export type UserCreationRequest = Omit<User, "id">;

// Access Management

export interface Permission {
  key: string;
  moduleName: string;
  permissionName: string;
}

export interface Role {
  id: string;
  name: string;
  slug: string;
  permissions: string[];
}

