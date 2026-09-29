import { HomePage } from "@/components/home-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("en", "home")

export default function Page() {
  return <HomePage locale="en" />
}
