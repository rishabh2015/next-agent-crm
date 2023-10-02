"use client";

import { DataTable } from "@/components/ui/data-table";
import { Api } from "@/lib/api";
import { Permission, Role } from "@/lib/entities.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { RolePermissionMatrix, columns } from "./columns";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Button } from "@/components/shadcn/ui/button";

export default function Page() {
  let [isLoading, setLoading] = useState<boolean>(false);
  let [permissions, setPermissions] = useState<Permission[]>([]);
  let [roles, setRoles] = useState<Role[]>([]);
  let [tableData, setTableData] = useState<RolePermissionMatrix[]>([]);
  let [tableColumns, setTableColumns] = useState<ColumnDef<RolePermissionMatrix>[]>([]);
  const data = useRef<Role[]>([]);

  const handleChange = useCallback(function (roleSlug: string, permission: string, checked: boolean) {
    const role = data.current.find((item) => item.slug === roleSlug);
    if (!role) return;

    if (checked) {
      role.permissions.push(permission);
    } else {
      const index = role.permissions.indexOf(permission);
      role.permissions.splice(index, 1);
    }
  }, []);

  useEffect(() => {
    Api.getPermissions().then((res) => {
      const permissions = res.body;
      setPermissions(permissions);

      const data: RolePermissionMatrix[] = permissions.map((item, i) => ({
        key: item.key,
        moduleName: item.moduleName,
        permissionName: item.permissionName,
        isFirstInModule: item.moduleName !== permissions[i - 1]?.moduleName,
      }));
      setTableData(data);
    });
    Api.getRoles().then((res) => {
      setRoles(res.body);
      data.current = res.body;
    });
  }, []);

  useEffect(() => {
    const rColumns: ColumnDef<RolePermissionMatrix>[] = roles.map((role) => ({
      accessorKey: "role:" + role.slug,
      header: role.name,
      cell: ({ row }) => <CheckItem role={role} permissionKey={row.original.key} onChange={handleChange} />,
    }));
    const tableColumns = [...columns, ...rColumns];
    setTableColumns(tableColumns);
  }, [roles, permissions, handleChange]);

  function handleSave() {
    setLoading(true);
    Api.putRoles(data.current).then(() => setLoading(false));
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-2 md:flex">
      <div className="flex items-center justify-between space-y-2 pb-8 border-b">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Roles &amp; Permissions</h2>
          <p className="text-muted-foreground">Now you can manage all your permissions at one place.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave} disabled={isLoading}>
            Save &amp; Publish
          </Button>
        </div>
      </div>
      <DataTable columns={tableColumns} data={tableData} />
    </div>
  );
}

interface CheckItemProps {
  permissionKey: string;
  role: Role;
  onChange: (roleSlug: string, permissionKey: string, checked: boolean) => void;
}

function CheckItem(props: CheckItemProps) {
  const { role, permissionKey, onChange } = props;
  const checked = role.permissions.includes(permissionKey);
  return (
    <div className="-my-2">
      <Checkbox defaultChecked={checked} onCheckedChange={(v) => onChange(role.slug, permissionKey, v === true)} />
    </div>
  );
}
