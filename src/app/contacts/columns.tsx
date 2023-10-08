"use client";

import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/shadcn/ui/button";
import { UserDetailsDialog } from "@/components/forms/user-details-dialog";
import { Contact, User } from "@/lib/entities.types";
import { get } from "http";
import UserTableActions from "../_components/user-table-actions";
import ContactTableActions from "../_components/contact-table-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getName = (data: Contact) => [data.firstName, data.lastName].join(" ");

const getPhone = (data: Contact) => [data.phoneCode, data.phoneNo].join(" ");

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "customId",
    header: "# ID",
  },
  {
    accessorKey: "name",
    header: "Contact Name",
    cell: ({ row }) => getName(row.original),
  },
  {
    accessorKey: "email",
    header: "Email ID",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => getPhone(row.original),
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ContactTableActions data={row.original} />,
  },
];
