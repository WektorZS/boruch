import { AboutPage } from "@/components/boruch/templates/about-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("de", "about")

export default function Page() {
  return <AboutPage locale="de" />
}
