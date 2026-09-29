import { ServicesPage } from "@/components/services-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("uk", "services")

export default function Page() {
  return <ServicesPage locale="uk" />
}
