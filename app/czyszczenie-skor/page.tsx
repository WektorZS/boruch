import type { Metadata } from "next"
import { getServiceBySlug } from "@/lib/services-data"
import { ServiceDetail } from "@/components/service-detail"

const service = getServiceBySlug("czyszczenie-skor")!

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.intro[0],
  alternates: { canonical: "/czyszczenie-skor" },
}

export default function Page() {
  return <ServiceDetail service={service} />
}
