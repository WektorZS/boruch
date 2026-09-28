import type { Metadata } from "next"
import { getServiceBySlug } from "@/lib/services-data"
import { ServiceDetail } from "@/components/service-detail"

const service = getServiceBySlug("przyciemnianie-szyb-i-lamp")!

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.intro[0],
}

export default function Page() {
  return <ServiceDetail service={service} />
}
