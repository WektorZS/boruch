import { PricingPage } from "@/components/boruch/templates/pricing-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("uk", "pricing")

export default function Page() {
  return <PricingPage locale="uk" />
}
