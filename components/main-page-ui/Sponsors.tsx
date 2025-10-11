"use client";

import { useMemo } from "react";
import { Spinner } from "../ui/spinner";
import { useFetchSponsors } from "@/hooks/useFetchSponsors";
import Image from "next/image";

export default function Sponsors() {
  const { sponsors, loading, error } = useFetchSponsors();

  const partners = useMemo(
    () => sponsors.filter((sponsor) => sponsor.is_partnership === true),
    [sponsors]
  );

  const nonPartners = useMemo(
    () => sponsors.filter((sponsor) => sponsor.is_partnership === false),
    [sponsors]
  );

  if (loading) {
    return <Spinner className="size-8" />;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-wrap justify-center items-center gap-10">
        {partners.length > 0 &&
          partners.map((partner, index) => {
            if (!partner.logo) {
              return (
                <h1 key={index} className="text-xl font-bold">
                  {partner.name}
                </h1>
              );
            }

            return (
              <Image
                src={partner.logo}
                height={100}
                width={100}
                alt={partner.name}
                key={index}
              />
            );
          })}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 mt-10">
        {nonPartners.length > 0 &&
          nonPartners.map((nonPartner, index) => {
            if (!nonPartner.logo) {
              return (
                <h1 key={index} className="text-lg font-bold">
                  {nonPartner.name}
                </h1>
              );
            }

            return (
              <Image
                src={nonPartner.logo}
                height={80}
                width={80}
                alt={nonPartner.name}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
}
