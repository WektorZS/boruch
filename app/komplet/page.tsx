import { ServicePage, serviceMetadata } from "@/components/boruch/templates/service-page"

export const metadata = serviceMetadata("komplet")

export default function Page() {
  return <ServicePage slug="komplet" />
}
