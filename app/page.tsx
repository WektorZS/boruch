import { HomePage } from "@/components/boruch/templates/home-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("pl", "home")

export default function Page() {
  return <HomePage locale="pl" />
}
