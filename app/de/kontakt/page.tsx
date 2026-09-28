import { ContactPage } from "@/components/boruch/templates/contact-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("de", "contact")

export default function Page() {
  return <ContactPage locale="de" />
}
