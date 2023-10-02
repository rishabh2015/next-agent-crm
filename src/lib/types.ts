export type RecordElements = Record<string, HTMLInputElement>;

export type RouteItem = {
  title: string;
  description?: string;
  link: string;
  isActive?: boolean;
  children?: RouteItem[];
};

export type UserType = "agent" | "employee";
