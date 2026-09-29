import { AboutPage } from "@/components/about-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("en", "about")

export default function Page() {
  return <AboutPage locale="en" />
}
