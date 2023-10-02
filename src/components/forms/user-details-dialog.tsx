import { AgentData } from "@/app/agents/columns";
import { EmployeeData } from "@/app/settings/employees/columns";
import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Api } from "@/lib/api";
import { UserCreationRequest } from "@/lib/entities.types";
import { RecordElements, UserType } from "@/lib/types";
import { useState } from "react";

function HorizontalFormLayout(props: React.PropsWithChildren) {
  return <div className="grid gap-4 py-4">{props.children}</div>;
}

function HorizontalFormItem(
  props: React.PropsWithChildren & { label: string; htmlFor?: string }
) {
  return (
    <div className="grid grid-cols-10 items-center gap-4">
      <Label htmlFor={props.htmlFor} className="col-span-3 text-right">
        {props.label}
      </Label>
      <div className="col-span-7">{props.children}</div>
    </div>
  );
}

interface Props {
  type: UserType;
  children: React.ReactNode;
  initialData?: AgentData | EmployeeData;
}

const config = {
  agent: {
    title: "Agent",
  },
  employee: {
    title: "Employee",
  },
};

export function UserDetailsDialog(props: Props) {
  const { type, children, initialData } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const editMode = !!initialData;

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as unknown as RecordElements;
    const customId = form.customId?.value;
    const firstName = form.firstName?.value;
    const lastName = form.lastName?.value;
    const phoneNumber = form.phoneNumber?.value;
    const email = form.email?.value;

    const payload: UserCreationRequest = { customId, firstName, lastName };
    if (type === "agent") payload.phoneNo = phoneNumber;
    if (type === "employee") payload.email = email;

    let promise;
    if (type === "agent") {
      promise = editMode
        ? Api.updateAgent(initialData.id, payload)
        : Api.createAgent(payload);
    }
    if (type === "employee") {
      promise = editMode
        ? Api.updateEmployee(initialData.id, payload)
        : Api.createEmployee(payload);
    }
    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit" : "Add"} {config[type].title}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? `Edit ${type} in your organization`
                : `Onboard a new ${type} to your organization`}
            </DialogDescription>
          </DialogHeader>

          <HorizontalFormLayout>
            <HorizontalFormItem
              htmlFor="customId"
              label={`${config[type].title} ID`}
            >
              <Input
                id="customId"
                placeholder={type === "agent" ? "A123" : "E123"}
                defaultValue={initialData?.customId || ""}
              />
            </HorizontalFormItem>
            <HorizontalFormItem htmlFor="firstName" label="First Name">
              <Input
                id="firstName"
                placeholder="First Name"
                defaultValue={initialData?.firstName || ""}
              />
            </HorizontalFormItem>
            <HorizontalFormItem htmlFor="lastName" label="Last Name">
              <Input
                id="lastName"
                placeholder="Last Name"
                defaultValue={initialData?.lastName || ""}
              />
            </HorizontalFormItem>
            {type === "agent" && (
              <HorizontalFormItem htmlFor="phoneNumber" label="Mobile">
                <Input
                  id="phoneNumber"
                  placeholder="9876543210"
                  defaultValue={initialData?.phoneNo}
                />
              </HorizontalFormItem>
            )}
            {type === "employee" && (
              <HorizontalFormItem htmlFor="email" label="Email">
                <Input
                  id="email"
                  placeholder="employee@domain.com"
                  defaultValue={initialData?.email}
                />
              </HorizontalFormItem>
            )}
          </HorizontalFormLayout>

          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
