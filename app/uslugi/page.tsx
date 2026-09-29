import { ServicesPage } from "@/components/services-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("pl", "services")

export default function Page() {
  return <ServicesPage locale="pl" />
}
