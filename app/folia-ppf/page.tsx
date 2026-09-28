import type { Metadata } from "next"
import { getServiceBySlug } from "@/lib/services-data"
import { ServiceDetail } from "@/components/service-detail"

const service = getServiceBySlug("folia-ppf")!

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.intro[0],
  alternates: { canonical: "/folia-ppf" },
}

export default function Page() {
  return <ServiceDetail service={service} />
}
