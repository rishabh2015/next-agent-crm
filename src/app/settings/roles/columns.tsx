import { ColumnDef } from "@tanstack/react-table";

export type RolePermissionMatrix = {
  key: string;
  moduleName: string;
  permissionName: string;
  isFirstInModule: boolean;

  [x: string | number | symbol]: unknown;
};

export const columns: ColumnDef<RolePermissionMatrix>[] = [
  {
    accessorKey: "moduleName",
    header: "Module",
    cell: ({ row }) =>
      row.original.isFirstInModule ? row.original.moduleName : null,
  },
  {
    accessorKey: "permissionName",
    header: "Permission",
    // cell: ({ row }) => (
    //   <span data-key={row.original.key}>{row.original.permissionName}</span>
    // ),
  },
];
