import { ContactPage } from "@/components/contact-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("pl", "contact")

export default function Page() {
  return <ContactPage locale="pl" />
}
