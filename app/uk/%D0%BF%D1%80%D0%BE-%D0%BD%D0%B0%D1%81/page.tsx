import { AboutPage } from "@/components/boruch/templates/about-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("uk", "about")

export default function Page() {
  return <AboutPage locale="uk" />
}
