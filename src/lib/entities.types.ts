// Account - User

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

// Contact

export interface Contact {
  id: string;
  customId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneCode: string;
  phoneNo: string;
  company: string;
}

export type ContactCreationRequest = Omit<Contact, "id">;

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

