import { PricingPage } from "@/components/pricing-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("pl", "pricing")

export default function Page() {
  return <PricingPage locale="pl" />
}
