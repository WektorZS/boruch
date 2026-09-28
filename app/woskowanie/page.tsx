import { ServicePage, serviceMetadata } from "@/components/boruch/templates/service-page"

export const metadata = serviceMetadata("woskowanie")

export default function Page() {
  return <ServicePage slug="woskowanie" />
}
