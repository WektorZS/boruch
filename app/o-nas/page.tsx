import { AboutPage } from "@/components/about-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("pl", "about")

export default function Page() {
  return <AboutPage locale="pl" />
}
