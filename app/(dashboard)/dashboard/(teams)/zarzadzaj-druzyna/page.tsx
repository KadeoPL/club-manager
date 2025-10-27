import React from "react";
import ManageData from "@/components/dashboard-ui/manageData";
import { SponsorsColumns } from "@/app/columns/sponsorsColumns";

export default function page() {
  return (
    <ManageData
      endpoint="teams"
      title="Zarządzaj drużynami"
      addElementLink="dodaj-druzyne"
      columns={SponsorsColumns}
      data={}
    />
  );
}
