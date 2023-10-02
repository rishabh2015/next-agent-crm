"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns, AgentData } from "./columns";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shadcn/ui/button";
import { UserDetailsDialog } from "@/components/forms/user-details-dialog";
import { Api } from "@/lib/api";
import { useEffect, useState } from "react";
import { User } from "@/lib/entities.types";

// const data: AgentData[] = [
//   {
//     id: "a_id_123",
//     customId: "A123",
//     firstName: "Ram",
//     lastName: "Babu",
//     mobile: "9876543210",
//     lastActiveOn: "-",
//     status: "Active",
//     lastBatteryStatus: "-",
//     labels: "-",
//     territory: "-",
//     locatingProfile: "-",
//   },
//   {
//     id: "a_id_124",
//     customId: "A124",
//     firstName: "Mayil",
//     lastName: "Vahanan",
//     mobile: "9876543211",
//     lastActiveOn: "-",
//     status: "Active",
//     lastBatteryStatus: "-",
//     labels: "-",
//     territory: "-",
//     locatingProfile: "-",
//   },
//   {
//     id: "a_id_125",
//     customId: "A125",
//     firstName: "Ram",
//     lastName: "Kumar",
//     mobile: "9876543212",
//     lastActiveOn: "-",
//     status: "Active",
//     lastBatteryStatus: "-",
//     labels: "-",
//     territory: "-",
//     locatingProfile: "-",
//   },
//   {
//     id: "a_id_126",
//     customId: "A126",
//     firstName: "Ramesh",
//     mobile: "9876543213",
//     lastActiveOn: "-",
//     status: "Active",
//     lastBatteryStatus: "-",
//     labels: "-",
//     territory: "-",
//     locatingProfile: "-",
//   },
//   {
//     id: "a_id_127",
//     customId: "A127",
//     firstName: "Andro",
//     lastName: "Babu",
//     mobile: "9876543214",
//     lastActiveOn: "-",
//     status: "Active",
//     lastBatteryStatus: "-",
//     labels: "-",
//     territory: "-",
//     locatingProfile: "-",
//   },
//   {
//     id: "a_id_128",
//     customId: "A128",
//     firstName: "Vahanan",
//     mobile: "9876543215",
//     lastActiveOn: "-",
//     status: "Active",
//     lastBatteryStatus: "-",
//     labels: "-",
//     territory: "-",
//     locatingProfile: "-",
//   },
// ];

export default function Page() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    Api.listAgents().then((res) => setData(res.body));
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2 pb-8 border-b">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agents</h2>
          <p className="text-muted-foreground">
            Now you can manage all your agents at one place.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserDetailsDialog type="agent">
            <Button variant="outline">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
          </UserDetailsDialog>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
