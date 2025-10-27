import { ColumnDefinition } from "@/components/dashboard-ui/manageData";
import { SponsorsType } from "@/types/sponsors";
import Image from "next/image";

export const SponsorsColumns: ColumnDefinition<SponsorsType>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Nazwa" },
  {
    key: "logo",
    header: "Logo",
    render: (row) => {
      return row.logo && row.name ? (
        <Image src={row.logo} alt={row.name} height={100} width={100} />
      ) : (
        <div>Brak logo</div>
      );
    },
  },
  { key: "is_partnership", header: "Partner" },
];
