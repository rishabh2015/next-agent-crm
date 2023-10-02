"use client";

import UserTableActions from "@/app/_components/user-table-actions";
import { UserDetailsDialog } from "@/components/forms/user-details-dialog";
import { Button } from "@/components/shadcn/ui/button";
import { SimpleAlertDialog } from "@/components/ui/simple-alert-dialog";
import { User } from "@/lib/entities.types";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface EmployeeData extends User {
  lastActiveOn?: string;
  status?: string;
}

const getName = (data: User) => [data.firstName, data.lastName].join(" ");

export const columns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "customId",
    header: "# ID",
  },
  {
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => getName(row.original),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "lastActiveOn",
    header: "Last Active on",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <UserTableActions data={row.original} type="employee" />,
  },
];
