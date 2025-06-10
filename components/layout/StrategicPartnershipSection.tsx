import Image from "next/image";

export default function StrategicPartnershipSection() {
  return (
    <div className="flex flex-col sm:flex-row justify-center bg-primary mt-15 py-10">
      <div className="w-full lg:w-[1260px] px-10">
        <div className="flex flex-col sm:flex-row w-full">
          <div className="w-full sm:w-1/2 grid place-items-center">
            <Image
              src="/images/gdovia_logo.png"
              alt="Herb Gdovia"
              width={160}
              height={160}
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 mt-10 sm:mt-0">
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-3">
                Jaki rodzaj wsparcia otrzymujemy?
              </h1>
              <p>
                Klub dotowany jest co roku przez Gminę Gdów w ramach wsparcia
                podmiotów prowadzących działalność pożytku publicznego.
              </p>
            </div>
            <div className="text-white mt-6">
              <h1 className="text-2xl font-bold mb-3">Wsparcie w 2025 roku</h1>
              <p>
                W 2025 rok Gdovia otrzymała dotację w wysokości{" "}
                <span className="font-bold">91.000 zł</span> w ramach realizacji
                zadania „Rozwój piłkarski dzieci i młodzieży w LKS Gdovia Gdów”.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
