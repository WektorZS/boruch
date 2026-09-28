import { ServicesPage } from "@/components/boruch/templates/services-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("de", "services")

export default function Page() {
  return <ServicesPage locale="de" />
}
