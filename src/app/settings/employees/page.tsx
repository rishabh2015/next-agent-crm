"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns, EmployeeData } from "./columns";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shadcn/ui/button";
import { UserDetailsDialog } from "@/components/forms/user-details-dialog";
import { Api } from "@/lib/api";
import { useEffect, useState } from "react";
import { User } from "@/lib/entities.types";

// const data: EmployeeData[] = [
//   {
//     id: "e_id_123",
//     customId: "E123",
//     firstName: "Ram",
//     lastName: "Babu",
//     email: "rambabu@domain.com",
//     lastActiveOn: "-",
//     status: "Active",
//   },
//   {
//     id: "e_id_124",
//     customId: "E124",
//     firstName: "Mayil",
//     lastName: "Vahanan",
//     email: "mayilvahanan@domain.com",
//     lastActiveOn: "-",
//     status: "Active",
//   },
//   {
//     id: "e_id_125",
//     customId: "E125",
//     firstName: "Ram",
//     lastName: "Kumar",
//     email: "ramkumar@domain.com",
//     lastActiveOn: "-",
//     status: "Active",
//   },
//   {
//     id: "e_id_126",
//     customId: "E126",
//     firstName: "Ramesh",
//     email: "ramesh@domain.com",
//     lastActiveOn: "-",
//     status: "Active",
//   },
//   {
//     id: "e_id_127",
//     customId: "E127",
//     firstName: "Andro",
//     lastName: "Babu",
//     email: "androbabu@domain.com",
//     lastActiveOn: "-",
//     status: "Active",
//   },
//   {
//     id: "e_id_128",
//     customId: "E128",
//     firstName: "Vahanan",
//     email: "vahanan@domain.com",
//     lastActiveOn: "-",
//     status: "Active",
//   },
// ];

export default function Page() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    Api.listAgents().then((res) => setData(res.body));
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-2 md:flex">
      <div className="flex items-center justify-between space-y-2 pb-8 border-b">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Now you can manage all your employees at one place.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserDetailsDialog type="employee">
            <Button variant="outline">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add employees
            </Button>
          </UserDetailsDialog>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
