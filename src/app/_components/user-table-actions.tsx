import { UserDetailsDialog } from "@/components/forms/user-details-dialog";
import { Button } from "@/components/shadcn/ui/button";
import { SimpleAlertDialog } from "@/components/ui/simple-alert-dialog";
import { User } from "@/lib/entities.types";
import { UserType } from "@/lib/types";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

interface Props<T> {
  type: UserType;
  data: T;
}

const getName = (data: User) => [data.firstName, data.lastName].join(" ");

export default function UserTableActions(props: Props<User>) {
  const { type, data } = props;

  const name = getName(data);
  const desc = `Are you sure you want to delete the ${type} "${name}"?`;

  return (
    <div className="-m-2">
      <UserDetailsDialog type={type} initialData={data}>
        <Button variant="ghost" size="icon">
          <Pencil2Icon />
        </Button>
      </UserDetailsDialog>

      <SimpleAlertDialog
        title={"Delete " + type}
        description={desc}
        primaryAction={{ text: "Delete" }}
        secondaryAction={{ text: "Cancel" }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log(data.id)}
        >
          <TrashIcon />
        </Button>
      </SimpleAlertDialog>
    </div>
  );
}
