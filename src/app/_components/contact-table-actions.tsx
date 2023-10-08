import { UserDetailsDialog } from "@/components/forms/user-details-dialog";
import { Button } from "@/components/shadcn/ui/button";
import { SimpleAlertDialog } from "@/components/ui/simple-alert-dialog";
import { Contact, User } from "@/lib/entities.types";
import { UserType } from "@/lib/types";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

interface Props<T> {
  data: T;
}

const getName = (data: Contact) => [data.firstName, data.lastName].join(" ");

export default function ContactTableActions(props: Props<Contact>) {
  const { data } = props;

  const name = getName(data);
  const desc = `Are you sure you want to delete the contact "${name}"?`;

  return (
    <div className="-m-2">
      <UserDetailsDialog type="agent" initialData={data}>
        <Button variant="ghost" size="icon">
          <Pencil2Icon />
        </Button>
      </UserDetailsDialog>

      <SimpleAlertDialog
        title={"Delete Contact"}
        description={desc}
        primaryAction={{ text: "Delete" }}
        secondaryAction={{ text: "Cancel" }}
      >
        <Button variant="ghost" size="icon" onClick={() => console.log(data.id)}>
          <TrashIcon />
        </Button>
      </SimpleAlertDialog>
    </div>
  );
}
