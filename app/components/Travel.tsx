import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { places } from "@/lib/travel";
import { Reveal } from "./Reveal";

const STAGGER_MS = 60;

const photoExists = (photo?: string) =>
  !!photo && fs.existsSync(path.join(process.cwd(), "public", photo));

export function Travel() {
  return (
    <section id="travel" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <Reveal>
        <h2 className="font-serif text-2xl sm:text-3xl">Places I love</h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
          Where I go to recharge, and usually where I find the next food spot
          worth ranking.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {places.map((place, index) => (
          <Reveal key={place.name} delay={index * STAGGER_MS}>
            <div className="flex h-full flex-col bg-paper p-7">
              {photoExists(place.photo) && (
                <span className="-mx-7 -mt-7 mb-6 block overflow-hidden">
                  <Image
                    src={place.photo!}
                    alt={place.name}
                    width={600}
                    height={400}
                    className="aspect-[3/2] h-auto w-full object-cover"
                  />
                </span>
              )}
              <h3 className="font-serif text-lg leading-snug">{place.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{place.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
