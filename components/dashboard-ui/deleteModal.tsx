import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";

interface DeleteModalProps {
  name: string;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteModal({
  name,
  setIsOpen,
  onConfirm,
}: DeleteModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <AlertDialog open={true} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tego działania nie można cofnąć. Spowoduje ono trwałe usunięcie
            sponsora oraz wszystkich powiązanych z nim danych z systemu.
            Operacja jest nieodwracalna.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" hover:font-black cursor-pointer transiton-all ease-in-out duration-300">
            Anuluj
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="text-destructive hover:font-black cursor-pointer transiton-all ease-in-out duration-300"
          >
            Usuń sponsora
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
