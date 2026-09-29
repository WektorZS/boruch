import { PricingPage } from "@/components/pricing-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("uk", "pricing")

export default function Page() {
  return <PricingPage locale="uk" />
}
