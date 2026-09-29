import { PricingPage } from "@/components/pricing-page"
import { pageMetadata } from "@/lib/content"

export const metadata = pageMetadata("en", "pricing")

export default function Page() {
  return <PricingPage locale="en" />
}
