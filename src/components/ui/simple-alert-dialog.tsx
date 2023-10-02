import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/shadcn/ui/button";

interface Action {
  text?: string;
  onClick?: () => void;
}

interface Props {
  title?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
}

export function SimpleAlertDialog(props: React.PropsWithChildren<Props>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        {props.children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {props.title && <AlertDialogTitle>{props.title}</AlertDialogTitle>}
          {props.description && (
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {props.secondaryAction && (
            <AlertDialogCancel>{props.secondaryAction?.text}</AlertDialogCancel>
          )}
          {props.primaryAction && (
            <AlertDialogAction>{props.primaryAction?.text}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
