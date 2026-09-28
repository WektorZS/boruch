import { RevealText } from "./reveal-text"

const clients = [
  { file: "radisson", name: "Radisson Blu" },
  { file: "avis", name: "Avis" },
  { file: "unity-line", name: "Unity Line" },
  { file: "baltica", name: "Baltica" },
  { file: "fitnessworld", name: "Fitness World" },
  { file: "mooveno", name: "Mooveno" },
  { file: "umwz", name: "Urząd Marszałkowski Województwa Zachodniopomorskiego" },
  { file: "logo-type", name: "Wilhelmsen" },
]

/** Source "Zaufali nam" client logos, set as a bone-toned index plate. */
export function TrustedBy({ title }: { title: string }) {
  return (
    <section aria-labelledby="trusted-title" className="section-md border-t border-line">
      <div className="shell-wide flex flex-col gap-10">
        <RevealText id="trusted-title" text={title} className="type-h2" />
        <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {clients.map((client, i) => (
            <li
              key={client.file}
              data-reveal=""
              style={{ "--d": i % 4 } as React.CSSProperties}
              className="group flex aspect-[5/3] items-center justify-center bg-bone p-6 lg:p-10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/clients/${client.file}.webp`}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className="max-h-14 w-auto max-w-full object-contain opacity-75 mix-blend-multiply grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
