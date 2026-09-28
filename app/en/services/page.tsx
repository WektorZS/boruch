import { ServicesPage } from "@/components/boruch/templates/services-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("en", "services")

export default function Page() {
  return <ServicesPage locale="en" />
}
