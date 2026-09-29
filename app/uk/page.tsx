import { HomePage } from "@/components/home-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("uk", "home")

export default function Page() {
  return <HomePage locale="uk" />
}
