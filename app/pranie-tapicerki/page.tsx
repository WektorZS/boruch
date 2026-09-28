import { ServicePage, serviceMetadata } from "@/components/boruch/templates/service-page"

export const metadata = serviceMetadata("pranie-tapicerki")

export default function Page() {
  return <ServicePage slug="pranie-tapicerki" />
}
