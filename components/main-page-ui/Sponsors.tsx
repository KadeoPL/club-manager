"use client";

import { useMemo } from "react";
import { Spinner } from "../ui/spinner";
import { useFetchSponsors } from "@/hooks/useFetchSponsors";
import Image from "next/image";
import { InfiniteSlider } from "../ui/infinite-slider";

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
      <div>
        <h1>Nasi partnerzy:</h1>
      </div>
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
                width={150}
                alt={partner.name}
                key={index}
                className="h-32 w-auto object-contain"
              />
            );
          })}
      </div>
      <div className="mt-20 flex items-center">
        <h1 className="pr-6">Sponsorzy:</h1>
        <InfiniteSlider
          speedOnHover={20}
          speed={60}
          gap={112}
          className="flex items-center"
        >
          {nonPartners.length > 0 &&
            nonPartners.map((nonPartner, index) => {
              return (
                <div className="flex relative" key={index}>
                  {nonPartner.logo ? (
                    <Image
                      src={nonPartner.logo}
                      height={100}
                      width={100}
                      className="h-16 w-auto object-contain"
                      alt={nonPartner.name}
                    />
                  ) : (
                    <h1 className="font-bold text-md">{nonPartner.name}</h1>
                  )}
                </div>
              );
            })}
        </InfiniteSlider>
      </div>
    </div>
  );
}
