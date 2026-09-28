import { ContactPage } from "@/components/boruch/templates/contact-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("en", "contact")

export default function Page() {
  return <ContactPage locale="en" />
}
