"use client";

import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/shadcn/ui/button";
import { UserDetailsDialog } from "@/components/forms/user-details-dialog";
import { User } from "@/lib/entities.types";
import { get } from "http";
import UserTableActions from "../_components/user-table-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface AgentData extends User {
  lastActiveOn?: string;
  status?: string;
  lastBatteryStatus?: string;
  labels?: string;
  territory?: string;
  locatingProfile?: string;
}

const getName = (data: User) => [data.firstName, data.lastName].join(" ");

const getPhone = (data: User) => [data.phoneCode, data.phoneNo].join(" ");

export const columns: ColumnDef<AgentData>[] = [
  {
    accessorKey: "customId",
    header: "# ID",
  },
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => getName(row.original),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => getPhone(row.original),
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
    accessorKey: "lastBatteryStatus",
    header: "Battery Life",
  },
  {
    accessorKey: "labels",
    header: "Labels",
  },
  {
    accessorKey: "territory",
    header: "Territory",
  },
  {
    accessorKey: "locatingProfile",
    header: "Locating Profile",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <UserTableActions data={row.original} type="agent" />,
  },
];
