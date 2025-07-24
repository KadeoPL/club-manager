import React from "react";
import { AlertTitle, Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
  title: string;
  text: string;
}

export default function AlertDestructive({ title, text }: Props) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
