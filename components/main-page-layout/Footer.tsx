import Image from "next/image";
import gdoviaLogo from "@/public/images/gdovia_logo.png";
import { socialMediaLinks } from "@/lib/social-media-links";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/5 mt-16">
      <div className="flex flex-col gap-6 max-w-6xl w-full mx-auto text-center pt-10 pb-5 items-center">
        <div className="flex justify-between w-full items-center">
          <Image src={gdoviaLogo} height={60} width={60} alt="Gdovia logo" />
          <div className="flex gap-3">
            {socialMediaLinks.map((element, index) => (
              <Link
                href={element.href}
                key={index}
                className="flex items-center gap-1 hover:text-black/50 transition-colors ease-in-out duration-200"
              >
                <element.icon size={24} />
                <span className="text-sm">{element.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-xs">
          © 2025 Gdovia Gdów, Wszystkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
