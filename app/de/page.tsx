import { HomePage } from "@/components/home-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("de", "home")

export default function Page() {
  return <HomePage locale="de" />
}
