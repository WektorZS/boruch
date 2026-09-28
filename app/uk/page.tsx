import { HomePage } from "@/components/boruch/templates/home-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("uk", "home")

export default function Page() {
  return <HomePage locale="uk" />
}
